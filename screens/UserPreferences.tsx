import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppIcon from '../view/AppIcon';
import { icontheme } from '../theme/icontheme';

export default function UserPreferences() {
    const navigation = useNavigation();

    // Mock User Data
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80',
    };

    interface PreferenceItem {
        label: string;
        action: () => void;
        value?: string;
        isDestructive?: boolean;
    }

    interface Section {
        title: string;
        items: PreferenceItem[];
    }

    const sections: Section[] = [
        {
            title: 'Your Preferences',
            items: [
                { label: 'Currency', value: 'USD ($)', action: () => { } },
                { label: 'Appearance', value: 'Dark', action: () => { } },
            ]
        },
        {
            title: 'More',
            items: [
                { label: 'Your Feedback', action: () => { } },
                { label: 'About', action: () => { } },
                { label: 'Send Feedback', action: () => { } },
                { label: 'Log Out', action: () => { }, isDestructive: true },
            ]
        }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AppIcon name="arrow-left" size={icontheme.iconSizes.sm} color={icontheme.colors.primary} />
                </TouchableOpacity>

                {/* Profile Card */}
                <View style={[styles.card, styles.profileCard]}>
                    <View style={styles.profileImageContainer}>
                        <Image source={{ uri: user.avatar }} style={styles.profileImage} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('ProfileEdit' as never)}
                        >
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Preferences & More Cards */}
                {sections.map((section, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionItems}>
                            {section.items.map((item, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.itemRow,
                                        idx !== section.items.length - 1 && styles.itemBorder
                                    ]}
                                    onPress={item.action}
                                >
                                    <Text style={[styles.itemLabel, item.isDestructive && styles.destructiveText]}>
                                        {item.label}
                                    </Text>
                                    {item.value && (
                                        <Text style={styles.itemValue}>{item.value}</Text>
                                    )}
                                    {!item.value && <Text style={styles.chevron}><AppIcon name="chevron-right" /></Text>}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    contentContainer: {
        padding: 16,
        gap: 20,
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 16,
        overflow: 'hidden',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#333',
    },
    profileInfo: {
        width: '70%',
        paddingLeft: 16,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#888',
        marginBottom: 12,
    },
    editButton: {
        backgroundColor: '#333',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    sectionItems: {
        gap: 4,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
    },
    itemLabel: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    itemValue: {
        fontSize: 16,
        color: '#888',
    },
    destructiveText: {
        color: '#FF4444',
    },
    chevron: {
        fontSize: 20,
        color: '#444',
        fontWeight: 'bold',
    },
});
