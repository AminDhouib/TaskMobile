import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#1E6F9F',
        borderRadius: 5,
        flexDirection: 'row',
        height: 48,
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 15,
        width: '100%',
    },
    container: {
        backgroundColor: '#000000',
        flex: 1,
        padding: 24,
    },
    emptyList: {
        color: '#808080',
        fontSize: 14,
        textAlign: 'center',
    },
    emptyListBold: {
        color: '#808080',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptyListImage: {
        alignSelf: 'center',
        height: 56,
        marginBottom: 16,
        marginTop: 56,
        width: 56,
    },
    mainTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    form: {
        flexDirection: 'row',
        marginBottom: 42,
        marginTop: 36,
        gap: 16,
    },
    secondForm: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
    },
    input: {
        backgroundColor: '#262626',
        borderRadius: 5,
        color: '#FFF',
        flex: 1,
        fontSize: 16,
        height: 54,
        marginTop: 16,
        padding: 16,
    },
    containerCol: {
        flexDirection: 'column',
        width: '100%',
        height: 200,
    },
    containerColBigger: {
        flexDirection: 'column',
        width: '100%',
        height: 270,
    },
    smallLnput: {
        backgroundColor: '#262626',
        borderRadius: 5,
        color: '#FFF',
        flex: 1,
        fontSize: 16,
        maxHeight: 84,
        marginRight: 12,
        marginTop: 16,
        padding: 16,
        justifyContent: 'center',
    },
    checkboxContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16,
    },
    checkboxLabel: {
        color: '#808080',
        fontSize: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    checkbox: {
        alignSelf: 'center',
        borderRadius: 999,
        borderColor: '#4EA8DE',
        marginLeft: 16,
    },
    taskDone: {
        color: '#808080',
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
        textDecorationLine: 'line-through',
    },
    taskAdd: {
        color: '#FFFFFF',
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
    },
})