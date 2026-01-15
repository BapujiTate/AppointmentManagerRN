import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AppIcon from '../view/AppIcon';
import PhotoOptionsModal from '../view/PhotoOptionsModal';
import { icontheme } from '../theme/icontheme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileEditScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [photoModalVisible, setPhotoModalVisible] = useState(false);

    const handleSave = () => {
        // Basic validation
        if (!firstName || !lastName || !email || !mobileNumber || !dob || !gender) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        // In a real app, you would save this data to AsyncStorage or backend
        Alert.alert('Success', 'Profile updated successfully!', [
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AppIcon name="arrow-left" size={icontheme.iconSizes.sm} color={icontheme.colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Profile Picture Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profilePictureContainer}>
                        <View style={styles.profileBadge}>
                            <AppIcon name="user" size={icontheme.iconSizes.lg} color={icontheme.colors.primary} />
                        </View>
                        <TouchableOpacity style={styles.cameraButton} onPress={() => setPhotoModalVisible(true)}>
                            <AppIcon name="camera" size={icontheme.iconSizes.sm} color={icontheme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    {/* First Name */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            label="First Name"
                            mode="outlined"
                            textColor="#FFFFFF"
                            theme={{ colors: { onSurfaceVariant: '#888888', outline: '#444444' } }}
                            style={styles.input}
                            placeholder="Enter first name"
                            placeholderTextColor="#666"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>

                    {/* Last Name */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            label="Last Name"
                            mode="outlined"
                            textColor="#FFFFFF"
                            theme={{ colors: { onSurfaceVariant: '#888888', outline: '#444444' } }}
                            style={styles.input}
                            placeholder="Enter last name"
                            placeholderTextColor="#666"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            label="Email"
                            mode="outlined"
                            textColor="#FFFFFF"
                            theme={{ colors: { onSurfaceVariant: '#888888', outline: '#444444' } }}
                            style={styles.input}
                            placeholder="email@example.com"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Mobile Number */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            label="Mobile Number"
                            mode="outlined"
                            textColor="#FFFFFF"
                            theme={{ colors: { onSurfaceVariant: '#888888', outline: '#444444' } }}
                            style={styles.input}
                            placeholder="+1 (555) 123-4567"
                            placeholderTextColor="#666"
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            label="Date of Birth"
                            mode="outlined"
                            textColor="#FFFFFF"
                            theme={{ colors: { onSurfaceVariant: '#888888', outline: '#444444' } }}
                            style={styles.input}
                            placeholder="DD/MM/YYYY"
                            placeholderTextColor="#666"
                            value={dob}
                            onChangeText={setDob}
                        />
                    </View>

                    {/* Gender */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            label="Gender"
                            mode="outlined"
                            textColor="#FFFFFF"
                            theme={{ colors: { onSurfaceVariant: '#888888', outline: '#444444' } }}
                            style={styles.input}
                            placeholder="Male / Female / Other"
                            placeholderTextColor="#666"
                            value={gender}
                            onChangeText={setGender}
                        />
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>

            <PhotoOptionsModal
                visible={photoModalVisible}
                onClose={() => setPhotoModalVisible(false)}
                onDelete={() => {
                    setPhotoModalVisible(false);
                    // Handle delete
                }}
                onGallery={() => {
                    setPhotoModalVisible(false);
                    // Handle gallery
                }}
                onCamera={() => {
                    setPhotoModalVisible(false);
                    // Handle camera
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 32,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    profilePictureContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    profileBadge: {
        width: 100,
        height: 100,
        backgroundColor: '#4169E1',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        backgroundColor: '#2a2a2a',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#0a0a0a',
    },
    cameraIcon: {
        fontSize: 18,
    },
    formSection: {
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#4169E1',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
