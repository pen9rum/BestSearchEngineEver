import * as React from "react";
import {DataTable, Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
import {View} from "react-native";
import {styles} from "./StatusScene_Style";
import {useEffect, useState} from "react";
import {api} from "../utils";
import moment from "moment/moment";
import {Stack} from "expo-router";

const modal = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Example Modal. Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
            <Button style={{marginTop: 30}} onPress={showModal}>
                Show
            </Button>
        </PaperProvider>
    );
};


export default function StatusScene() {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 100]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [visible, setVisible] = useState([false, false, false, false]);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const [items, setItems] = useState([]);

    useEffect(() => {
        const func = () => {
            api('GET', '/getAll', {}).then(res => {
                setItems(res.map(x => ({
                    id: x.id,
                    name: x.name,
                    WakeUp: x.temp?.[0]?.WakeUp ?? false,
                    Lunch: x.temp?.[0]?.Lunch ?? false,
                    Dinner: x.temp?.[0]?.Dinner ?? false,
                    Medicine: x.temp?.[0]?.Medicine ?? false,
                })));
                setLoading(false)
            })
        }
        func()
        const interval = setInterval(func, 1000)
        return (() => {
            clearInterval(interval);
        })
    }, []);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    return (
        <PaperProvider>
            <Stack.Screen options={{
                title: "照護人介面",
            }}/>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>名字</DataTable.Title>
                    <DataTable.Title numeric>起床</DataTable.Title>
                    <DataTable.Title numeric>午餐</DataTable.Title>
                    <DataTable.Title numeric>晚餐</DataTable.Title>
                    <DataTable.Title numeric>吃藥</DataTable.Title>
                </DataTable.Header>
                {loading && (
                    <Text>載入中..</Text>
                )}
                {items.slice(from, to).map((item, i) => (
                    <DataTable.Row key={item.id}>
                        <Portal>
                            <Modal visible={visible[i]} onDismiss={() => {
                                let temp = [...visible];
                                temp[i] = false;
                                setVisible(temp)
                            }
                            } contentContainerStyle={containerStyle}>
                                <Text>名字: {item.name}</Text>
                                <View style={styles.contentContainer}>
                                    <Text>起床: </Text>
                                    <View style={(item.WakeUp) ? styles.greenBox : styles.redBox}></View>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text>午餐: </Text>
                                    <View style={(item.Lunch) ? styles.greenBox : styles.redBox}></View>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text>晚餐: </Text>
                                    <View style={(item.Dinner) ? styles.greenBox : styles.redBox}></View>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text>吃藥: </Text>
                                    <View style={(item.Medicine) ? styles.greenBox : styles.redBox}></View>
                                </View>
                            </Modal>
                        </Portal>
                        <DataTable.Cell onPress={() => {
                            setVisible(prev => {
                                let temp = [...prev];
                                temp[i] = true;
                                return temp;
                            })
                        }}>{item.name}</DataTable.Cell>
                        <DataTable.Cell
                            numeric
                            style={(item.WakeUp) ? styles.greenBox : styles.redBox}
                        >&nbsp;</DataTable.Cell>
                        <DataTable.Cell
                            numeric
                            style={(item.Lunch) ? styles.greenBox : styles.redBox}
                        >&nbsp;</DataTable.Cell>
                        <DataTable.Cell
                            numeric
                            style={(item.Dinner) ? styles.greenBox : styles.redBox}
                        >&nbsp;</DataTable.Cell>
                        <DataTable.Cell
                            numeric
                            style={(item.Medicine) ? styles.greenBox : styles.redBox}
                        >&nbsp;</DataTable.Cell>
                    </DataTable.Row>
                ))}


                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} / ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'行/頁'}
                />
            </DataTable></PaperProvider>
    );
}