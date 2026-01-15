import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import AppIcon from './AppIcon';
import { icontheme } from '../theme/icontheme';

interface PhotoOptionsModalProps {
    visible: boolean;
    onClose: () => void;
    onDelete: () => void;
    onGallery: () => void;
    onCamera: () => void;
}

export default function PhotoOptionsModal({ visible, onClose, onDelete, onGallery, onCamera }: PhotoOptionsModalProps) {
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
                            <View style={styles.header}>
                                <Text style={styles.title}>Profile Photo</Text>
                            </View>

                            <View style={styles.optionsContainer}>
                                <TouchableOpacity style={styles.optionItem} onPress={onDelete}>
                                    <View style={[styles.iconContainer, styles.deleteIcon]}>
                                        <AppIcon name="trash" size={icontheme.iconSizes.sm} color={icontheme.colors.danger} />
                                    </View>
                                    <Text style={[styles.optionText, styles.deleteText]}>Delete photo</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.optionItem} onPress={onGallery}>
                                    <View style={styles.iconContainer}>
                                        <AppIcon name="image" size={icontheme.iconSizes.sm} color={icontheme.colors.primary} />
                                    </View>
                                    <Text style={styles.optionText}>Choose from gallery</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.optionItem} onPress={onCamera}>
                                    <View style={styles.iconContainer}>
                                        <AppIcon name="camera" size={icontheme.iconSizes.sm} color={icontheme.colors.primary} />
                                    </View>
                                    <Text style={styles.optionText}>Take photo</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
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
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    closeButton: {
        fontSize: 20,
        color: '#888',
    },
    optionsContainer: {
        gap: 16,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 16,
        borderRadius: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    deleteIcon: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    optionText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    deleteText: {
        color: '#EF4444',
    },
    cancelButton: {
        marginTop: 4,
        padding: 5,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '600',
    },
});
