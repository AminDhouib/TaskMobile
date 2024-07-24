import React from 'react'
import { Image, View } from 'react-native'
import { Logo } from '../../assets/index'
import { styles } from './styles'

export function Header() {
    return (
        <View style={styles.logoContainer}>
            <Image
                onError={() => console.log('Image failed to load')}
                source={Logo}
                defaultSource={Logo}
                style={styles.logo}
            />
        </View>
    )
}
