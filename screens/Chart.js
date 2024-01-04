import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { ThemeContext } from '../config/themeContext'; // Make sure the path is correct

const ChartPage = ({ route }) => {
    const { id } = route.params;
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState(1);
    const { theme } = useContext(ThemeContext); // Use ThemeContext

    // Function to calculate the UNIX timestamp for 'from' parameter based on days back
    const calculateUnixTime = (daysBack) => {
        let pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - daysBack);
        return Math.floor(pastDate.getTime() / 1000); // Convert to UNIX timestamp
    };

    const fetchChartData = async (daysBack) => {
        setIsLoading(true);
        const toUnix = Math.floor(Date.now() / 1000); // current date in UNIX timestamp
        const fromUnix = calculateUnixTime(daysBack); // calculated based on the selected range

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=eur&from=${fromUnix}&to=${toUnix}&precision=5`);
            const data = await response.json();
            if (response.ok && data.prices) {
                setChartData({
                    labels: data.prices.map((price) => moment(price[0]).format('LT')), // Formatting the date for better readability
                    datasets: [{
                        data: data.prices.map((price) => price[1]),
                        strokeWidth: 2,
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Optional styling for line color
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

    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            
            {/* Title */}
            <Text style={[styles.titleStyle, { color: theme.text }]}>{'Price Evolution'}</Text>


            {/* Buttons for selecting time range */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                <TouchableOpacity onPress={() => setTimeRange(1)} style={[styles.timeRangeButton, { backgroundColor: theme.tabBarActiveTint }]}>
                    <Text style={{ color: theme.buttonText }}>Last 24 hours</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTimeRange(7)} style={[styles.timeRangeButton, { backgroundColor: theme.tabBarActiveTint }]}>
                    <Text style={{ color: theme.buttonText }}>Last 7 days</Text>
                </TouchableOpacity>
            </View>

            {/* Line Chart */}
            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "0",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                    },
                }}
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
    favoritesButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    favoritesButtonText: {
        color: 'white',
        textAlign: 'center',
    }
});

export default ChartPage;
