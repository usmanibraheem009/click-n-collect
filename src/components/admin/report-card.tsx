import { useTheme } from '@/src/hooks/useTheme';
import { mS, mVs } from '@/src/utils/scale';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReportCardProps {
    label: string;
    heading: string
}

const ReportCard = memo(({ label, heading }: ReportCardProps) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: theme.surface.secondary, borderColor: theme.border.secondary }]}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>{label}</Text>
            <Text style={[styles.heading, { color: theme.text.primary }]}>{heading}</Text>
            <View style={[styles.badge, { backgroundColor: theme.background.secondary }]}>
                <Text style={[{ color: theme.text.primary }]}>18%</Text>
            </View>
        </View>
    )
})

export default ReportCard

const styles = StyleSheet.create({
    card: {
        borderRadius: mS(30),
        borderWidth: 1,
        alignItems: 'flex-start',
        width: mS(200),
        padding: mS(20),
        gap: mVs(12)
    },
    label: {
        fontSize: mS(14),
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    heading: {
        fontSize: mS(24),
        fontFamily: 'bold'
    },
    badge: {
        height: mVs(20),
        width: mS(45),
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
})