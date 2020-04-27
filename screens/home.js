import React, { useState } from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Modal,TouchableWithoutFeedback, Keyboard} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from './reviewForm';
import { add } from 'react-native-reanimated';

export default function Home({navigation}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [reviews,setReviews] = useState([
        {title: 'Zelda, Breath of the wild',rating: 5, body: 'Lorem ipsum dolor sit amter',key: '1'},
        {title: 'Gotta Catcha them all (again)',rating: 4, body: 'Lorem ipsum dolor sit amter',key: '2'},
        {title: 'Not at all',rating: 3, body: 'Lorem ipsum dolor sit amter',key: '3'},
        {title: 'Not so "Final Fantasy"',rating: 2, body: 'Lorem ipsum dolor sit amter',key: '4'},
    ])

    const addReview = (review) => {
        review.key = Math.random().toString()
        setReviews((currentReviews) => {
            return [review,...currentReviews]
        })
        setModalOpen(false)
    }

    return (
        <View style={globalStyles.container}>
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            name='close'
                            size={24}
                            style={{ ...styles.modalToggle, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)}
                        />
                        <ReviewForm addReview={addReview} />
                </View>
                </TouchableWithoutFeedback>
            </Modal>
            
            <MaterialIcons
                name='add'
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalOpen(true)}
            />
            <FlatList 
                data={reviews}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails',item)}>
                        <Card>
                            <Text style={globalStyles.titleText}>{item.title}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    }
})