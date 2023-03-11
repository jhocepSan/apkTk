import { StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const ButtonMove = (props) => {
    const { positionInitialX, positionInitialY, tipo, img ,handleButton} = props;
    const [enviar,setEnviar]=useState(false);
    const x = useSharedValue(positionInitialX);
    const y = useSharedValue(positionInitialY);
    const pulsado = useSharedValue(false);
    const eventHandle = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            pulsado.value = true;
            ctx.startX = x.value;
            ctx.startY = y.value;
        },
        onActive: (event, ctx) => {
            //x.value=ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            enviarInformacion()
            setEnviar(true)
            pulsado.value = false;
            y.value = positionInitialY;
            
        }
    });
    const enviarInformacion=()=>{
        handleButton();
    }
    const uas = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                0,
                [0, 1, 3],
                ['rgba(255,0,0,0.1)', 'rgba(0,255,0,0.5)', 'rgba(12,0,255,0.9)'],
            ),
            transform: [{ translateX: x.value }, { translateY: y.value }],
        }
    })
    
    return (
        <PanGestureHandler onGestureEvent={eventHandle}>
            <Animated.View style={[styles.ball, uas]}>
                <Image
                    source={img ? require('../../assets/cabeza.png') : require('../../assets/cuerpo.png')}
                    style={styles.ImageIconStyle}
                />
            </Animated.View>
        </PanGestureHandler>
    )
}

export default ButtonMove

const styles = StyleSheet.create({
    ball: {
        height: '100%',
        width: '100%',
        borderRadius: 2,
        marginHorizontal: 0,
        marginVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageIconStyle: {
        transform: [{ rotate: '90deg' }],
    }
})