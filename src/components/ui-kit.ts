import {
    AntDesign,
    Entypo,
    Feather,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
} from '@expo/vector-icons';
import React from 'react';

import { DollarSign } from 'lucide-react-native';

import {
    Animated,
    AppState,
    AppStateStatus,
    BackHandler,
    DevSettings,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    LogBox,
    NativeEventEmitter,
    NativeModules,
    NativeSyntheticEvent,
    PermissionsAndroid,
    Platform,
    RefreshControl,
    View as RNView,
    Share,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputKeyPressEventData,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    useColorScheme,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';

import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@components/ui/modal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// GlueStack UI imports using the individual component structure
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator } from '@components/ui/actionsheet';
import { Alert } from '@components/ui/alert';
import { Avatar, AvatarImage } from '@components/ui/avatar';
import { Box } from '@components/ui/box';
import { Button, ButtonText } from '@components/ui/button';
import { Center } from '@components/ui/center';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@components/ui/checkbox';
import { Divider } from '@components/ui/divider';
import { FlatList } from '@components/ui/flat-list';
import { FormControl } from '@components/ui/form-control';
import { GluestackUIProvider } from '@components/ui/gluestack-ui-provider';
import { Heading } from '@components/ui/heading';
import { HStack } from '@components/ui/hstack';
import {
    AddIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CloseIcon,
    EyeIcon,
    EyeOffIcon,
    Icon,
    RemoveIcon,
} from '@components/ui/icon';
import { Image } from '@components/ui/image';
import { Input, InputField, InputIcon, InputSlot } from '@components/ui/input';
import { Link } from '@components/ui/link';
import { Menu } from '@components/ui/menu';
import { Pressable } from '@components/ui/pressable';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@components/ui/radio';
import { ScrollView } from '@components/ui/scroll-view';
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from '@components/ui/select';
import { Skeleton, SkeletonText } from '@components/ui/skeleton';
import { Spinner } from '@components/ui/spinner';
import { Switch } from '@components/ui/switch';
import { Text } from '@components/ui/text';
import { Toast } from '@components/ui/toast';
import { VStack } from '@components/ui/vstack';
// TODO: These NativeBase-specific types and functions need to be replaced or removed
// For now, creating placeholder types to prevent errors
export type IInputProps = any;
export type IBoxProps = any;
export type IStackProps = any;
export type ICheckboxProps = any;
export type ILinkProps = any;
export type IButtonProps = any;

// Import token system from separate file
export { useColorMode, useColorModeValue, useToken } from './token-system';

// TODO: These NativeBase components need to be replaced
export const extendTheme = (customTheme: any) => {
    // For GlueStack UI compatibility, just return the custom theme
    // In a real implementation, this would merge with a base theme
    return customTheme;
};

export const HamburgerIcon = () => {
    console.warn('HamburgerIcon is deprecated, use GlueStack UI Icon with a menu icon instead');
    return null;
};

// AlertDialog - just use GlueStack UI Modal components directly

// Simple AspectRatio component using GlueStack UI Box
export const AspectRatio = ({ ratio = 1, children, style, ...props }: any) => {
    return React.createElement(
        Box,
        {
            ...props,
            style: {
                aspectRatio: ratio,
                position: 'relative',
                overflow: 'hidden',
                ...style,
            },
        },
        children
    );
};

export const Hidden = ({ children, ...props }: any) => {
    console.warn('Hidden is deprecated, use conditional rendering instead');
    return children;
};

export const useBreakpointValue = (values: any) => {
    console.warn('useBreakpointValue is deprecated, implement responsive design with GlueStack UI');
    return values.base || values;
};

export const ZStack = ({ children, ...props }: any) => {
    console.warn('ZStack is deprecated, use absolute positioning or GlueStack UI alternatives');
    return children;
};

export const Spacer = ({ ...props }) => {
    console.warn('Spacer is deprecated, use GlueStack UI spacing utilities instead');
    return null;
};

export const Flex = ({ children, ...props }: any) => {
    // Use Box with flex styles instead of deprecated Flex
    return React.createElement(
        Box,
        {
            className: 'flex',
            ...props,
        },
        children
    );
};

export const Stack = VStack; // Alias VStack as Stack for compatibility

// Re-export everything
export {
    Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, AddIcon, Alert, AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    // React Native components
    Animated, AntDesign, AppState,
    AppStateStatus, Avatar, AvatarImage, BackHandler,
    // GlueStack UI components
    Box, Button,
    ButtonText, Center, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, ChevronDownIcon, ChevronRightIcon, CloseIcon, DevSettings, Dimensions, Divider,
    // icon from lucide react native
    DollarSign, Entypo, EyeIcon,
    EyeOffIcon, Feather, FlatList, FontAwesome, FontAwesome5, FormControl, GluestackUIProvider, Heading, HStack, Icon, Image, Input, InputField, InputIcon, InputSlot,
    // Expo Vector Icons
    Ionicons, Keyboard, KeyboardAvoidingView, Link, Linking, LogBox, MaterialCommunityIcons, MaterialIcons, Menu, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, NativeEventEmitter,
    NativeModules, NativeSyntheticEvent, Octicons, PermissionsAndroid, Platform, Pressable, Radio,
    RadioGroup, RadioIcon, RadioIndicator, RadioLabel, RefreshControl, RemoveIcon, RNView, SafeAreaProvider, ScrollView, Select, SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput, SelectItem, SelectPortal,
    SelectTrigger, Share, Skeleton,
    SkeletonText, Spinner, StyleProp, StyleSheet, Switch, Text, TextInput, TextInputKeyPressEventData,
    TextInputProps,
    TextStyle, Toast, TouchableOpacity, useColorScheme, useWindowDimensions, ViewStyle, VStack
};

// Aliases for compatibility
export const View = Box;
export const StatusBar = RNView; // TODO: Replace with proper StatusBar handling
// NativeBaseProvider removed - use GluestackUIProvider directly

// Additional GlueStack UI component exports that might be needed
