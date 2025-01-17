import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { ThemeContext } from '../config/themeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const ChartPage = ({ route }) => {
    const { id } = route.params;
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState(1); // 1 for last 24h, 7 for last 7d
    const [lowHigh, setLowHigh] = useState({ low: 0, high: 0 });
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const navigation = useNavigation();

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
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=eur&from=${fromUnix}&to=${toUnix}&precision=2`);
            const data = await response.json();
            if (response.ok && data.prices && data.prices.length > 0) {
                const prices = data.prices.map(price => price[1]);
                setChartData({
                    labels: data.prices.map((price) => moment(price[0]).format('LT')),
                    datasets: [{
                        data: prices,
                        
                    }],
                });

                setLowHigh({
                    low: Math.min(...prices),
                    high: Math.max(...prices),
                });
            } else {
                throw new Error(t('apiOffline'));
            }
        } catch (error) {
            setErrorMessage(t('apiOffline'));
            setErrorModalVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChartData(timeRange);
    }, [id, timeRange]);

    const screenWidth = Dimensions.get("window").width - 10;

    const getLineColor = (theme, opacity = 1) => {
        const hex = theme.lineBackground;
        const rgb = parseInt(hex.substring(1), 16);
        const red = (rgb >> 16) & 255;
        const green = (rgb >> 8) & 255;
        const blue = rgb & 255;
      
        return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      };

    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)}
            >
                <View style={[styles.modalContainer, { backgroundColor: theme.modalBackground }]}>
                    <Text style={{ color: theme.text }}>{errorMessage}</Text>
                    <TouchableOpacity
                        style={[styles.closeButton, { backgroundColor: theme.tabBarActiveTint }]}
                        onPress={() => {
                            setErrorModalVisible(false);
                            navigation.navigate('Details', { id: id });
                        }}
                    >
                        <Text style={{ color: theme.text }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={[styles.titleStyle, { color: theme.text }]}>{t('priceEvolution')}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                    <TouchableOpacity onPress={() => setTimeRange(1)} style={[styles.timeRangeButton, { backgroundColor: theme.tabBarActiveTint }]}>
                        <Text style={{ color: theme.text }}>{t('last24h')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTimeRange(7)} style={[styles.timeRangeButton, { backgroundColor: theme.tabBarActiveTint }]}>
                        <Text style={{ color: theme.text }}>{t('last7d')}</Text>
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color={theme.activityIndicator} />
                ) : chartData ? (
                    <>
                        <LineChart
                            data={chartData}
                            width={screenWidth}
                            height={220}
                            chartConfig={{
                                backgroundColor: theme.background,
                                backgroundGradientFrom: theme.background,
                                backgroundGradientTo: theme.background,
                                decimalPlaces: 2,
                                strokeWidth: 3,
                                color: (opacity = 1) => getLineColor(theme, opacity),
                                labelColor: (_opacity = 1) => theme.text,
                                style: {
                                    borderRadius: 16,
                                    paddingRight: 30,
                                },
                                propsForLabels: {
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                },
                                propsForBackgroundLines: {
                                    stroke: "none" 
                                },
                                propsForDots: {
                                    r: "0"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            withHorizontalLabels={true}
                            withVerticalLabels={false}
                            fromZero={false}
                            yAxisInterval={2}
                        />
                        <View style={styles.lowHighContainer}>
                            <Text style={[styles.lowHighText, { color: theme.text }]}>{t('low')}: {lowHigh.low}</Text>
                            <Text style={[styles.lowHighText, { color: theme.text }]}>{t('high')}: {lowHigh.high}</Text>
                        </View>
                        <Text style={[styles.activeTimeRange, { color: theme.text }]}>
                            {timeRange === 1 ? t('last24hfilter') : t('last7dfilter')}
                        </Text>
                    </>
                ) : (
                    <Text style={{ color: theme.text }}>{t('noChartData')}</Text>
                )}
            </ScrollView>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
    },
    lowHighContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    lowHighText: {
        fontSize: 16,
    },
    activeTimeRange: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    }
});

export default ChartPage;
