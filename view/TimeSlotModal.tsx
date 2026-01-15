import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';

interface TimeSlotModalProps {
    visible: boolean;
    onClose: () => void;
    slots: string[];
    loading: boolean;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

export default function TimeSlotModal({ visible, onClose, slots, loading, selectedDate, onDateChange }: TimeSlotModalProps) {
    const getDays = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 3; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const days = getDays();

    const formatDateLabel = (date: Date, index: number) => {
        if (index === 0) return 'Today';
        if (index === 1) return 'Tomorrow';
        return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    };

    const isSelected = (date: Date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback onPress={() => { /* Prevent closing when clicking inside modal content */ }}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select Time</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Text style={styles.closeButton}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.daySelectionContainer}>
                                {days.map((date, index) => {
                                    const selected = isSelected(date);
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.dayTab, selected && styles.selectedDayTab]}
                                            onPress={() => onDateChange(date)}
                                        >
                                            <Text style={[styles.dayText, selected && styles.selectedDayText]}>
                                                {formatDateLabel(date, index)}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {loading ? (
                                <ActivityIndicator size="large" color="#00AA00" style={styles.modalLoader} />
                            ) : (
                                <FlatList
                                    data={slots}
                                    numColumns={4}
                                    keyExtractor={(item) => item}
                                    contentContainerStyle={styles.slotsGrid}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.slotItem}>
                                            <Text style={styles.slotText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    closeButton: {
        fontSize: 24,
        color: '#888',
    },
    daySelectionContainer: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    dayTab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    selectedDayTab: {
        backgroundColor: '#00AA00',
    },
    dayText: {
        color: '#888',
        fontWeight: '600',
        fontSize: 14,
    },
    selectedDayText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    modalLoader: {
        marginTop: 50,
    },
    slotsGrid: {
        gap: 10,
    },
    slotItem: {
        flex: 1,
        backgroundColor: '#333',
        paddingVertical: 12,
        margin: 4,
        borderRadius: 8,
        alignItems: 'center',
    },
    slotText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
