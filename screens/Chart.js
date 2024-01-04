import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { ThemeContext } from '../config/themeContext'; 

const ChartPage = ({ route }) => {
    const { id } = route.params;
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState(1);
    const { theme } = useContext(ThemeContext);

    const calculateUnixTime = (daysBack) => {
        let pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - daysBack);
        return Math.floor(pastDate.getTime() / 1000);
    };

    const fetchChartData = async (daysBack) => {
        setIsLoading(true);
        const toUnix = Math.floor(Date.now() / 1000);
        const fromUnix = calculateUnixTime(daysBack);

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=eur&from=${fromUnix}&to=${toUnix}&precision=5`);
            const data = await response.json();
            if (response.ok && data.prices) {
                setChartData({
                    labels: data.prices.map((price) => moment(price[0]).format('LT')),
                    datasets: [{
                        data: data.prices.map((price) => price[1]),
                        strokeWidth: 2,
                        color: (opacity = 1) => theme.tabBarActiveTint,
                    }],
                });
            } else {
                throw new Error("Failed to fetch chart data");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChartData(timeRange);
    }, [id, timeRange]);

    if (isLoading) {
        return <ActivityIndicator size="large" color={theme.activityIndicator} />;
    }

    if (!chartData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
                <Text style={{ color: theme.text }}>No chart data available</Text>
            </View>
        );
    }

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundColor: theme.background,
        backgroundGradientFrom: theme.background,
        backgroundGradientTo: theme.background,
        decimalPlaces: 2,
        color: (opacity = 1) => theme.tabBarActiveTint,
        labelColor: (opacity = 1) => theme.text,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "0",
            strokeWidth: "2",
            stroke: theme.tabBarActiveTint,
        },
        propsForLabels: {
            fontSize: 12,
            fontWeight: 'bold',
        },
    };

    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <Text style={[styles.titleStyle, { color: theme.text }]}>Price Evolution</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                <TouchableOpacity onPress={() => setTimeRange(1)} style={[styles.timeRangeButton, { backgroundColor: theme.tabBarActiveTint }]}>
                    <Text style={{ color: theme.buttonText }}>Last 24 hours</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTimeRange(7)} style={[styles.timeRangeButton, { backgroundColor: theme.tabBarActiveTint }]}>
                    <Text style={{ color: theme.buttonText }}>Last 7 days</Text>
                </TouchableOpacity>
            </View>
            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                withHorizontalLabels={true}
                withVerticalLabels={false}
                fromZero={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    timeRangeButton: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

export default ChartPage;
