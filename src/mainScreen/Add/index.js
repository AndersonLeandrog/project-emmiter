import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';

import firestore from '../../config/firebase';
import { collection, doc, setDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../config/colors";
import styles from "./style";

export default function AddUser({ navigation }) {
    {/* Statements, Informações de cadastro do usuário */ }
    const [name, setName] = useState('');
    const [bornDate, setBornDate] = useState();
    const [gender, setGender] = useState('Masculino');
    const [document, setDocument] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [model, setModel] = useState('');
    const [serialNumber, setSerialNumber] = useState();
    const [dateIn, setDateIn] = useState();
    const [dateOut, setDateOut] = useState();

    const [tempName, setTempName] = useState('');
    const [tempBornDate, setTempBornDate] = useState('');
    const [tempDocument, setTempDocument] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [tempCity, setTempCity] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [tempModel, setTempModel] = useState('');
    const [tempDateIn, setTempDateIn] = useState('');
    const [tempDateOut, setTempDateOut] = useState('');
    const [textColor, setTextColor] = useState(colors.gray);

    // As funções abaixo, verifica todos os dados de cadastro antes de realizar o cadastro do usuário
    // para se certificar de que todos os dados estejam corretamente preenchidos
    const verifyName = (text) => {
        if (/^[^@#$%&*()!":;[]<>_=-',?]*$/.test(text)) {
            setTempName(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempName;
        };
    };

    const verifyBorn = (text) => {
        if (/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(text)) {
            setTempBornDate(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempBornDate;
        };
    };

    const verifyDocument = (text) => {
        if (/^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}-[0-9]{1,2})$/.test(text)) {
            setTempDocument(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempDocument;
        };
    };

    const verifyAddress = (text) => {
        if (/^[^@#$%&*()!":;[]<>_=-'?]*$/.test(text)) {
            setTempAddress(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempAddress;
        };
    };

    const verifyCity = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempCity(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempCity;
        };
    };

    const verifyPhone = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempPhone(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempPhone;
        };
    };

    const verifyEmail = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempEmail(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempEmail;
        };
    };

    const verifyModel = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempModel(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempModel;
        };
    };

    const createSerialNumber = () => {
        // Gera um número de série aleatório de 6 dígitos
        const randomSerial = Math.floor(Math.random() * 900000) + 100000;
        setSerialNumber(randomSerial);
    };

    const verifyDateIn = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempDateIn(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempDateIn;
        };
    };

    const verifyDateOut = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempDateOut(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempDateOut;
        };
    };


    // Adiciona o usuário ao fireStore passando por 
    // parâmetro todos os dados inseridos no cadastro
    const clientRef = collection(firestore, 'user');
    const register = async (name, bornDate, gender, document, adress, city, phone, email, model, serialNumber, dateIn, dateOut) => {
        try {
            const newUserDocRef = doc(clientRef);
            await setDoc(newUserDocRef, {
                name: name,
                born: bornDate,
                gender: gender,
                document: document,
                adress: adress,
                city: city,
                phone: phone,
                email: email,
                model: model,
                serialNumber: serialNumber,
                dateIn: dateIn,
                dateOut: dateOut,
            });

            // redireciona o usuário para a tela inicial
            navigation.navigate('Home');
        } catch (error) {
            console.log('Erro ao cadastrar o usuário: ', error);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={{ width: '85%', marginTop: 30, fontStyle: 'italic', color: colors.black }}>
                        <AntDesign name='info' size={16} color={colors.black} />
                        {
                            'Para adicionar um novo cliente, preencha\n' +
                            'todos os dados corretamente e certifique-se\n' +
                            'de que tudo esteja correto, caso o contrário o\n' +
                            'procedimento pode apresentar erros.'
                        }
                    </Text>

                    <View style={{ ...styles.Information, marginTop: 50 }}>
                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='user' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={name}
                                placeholder={'Nome Completo'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setName(text);
                                    verifyName(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='aliwangwang-o1' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={bornDate}
                                placeholder={'Data de Nascimento DD/MM/AAAA'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setBornDate(text);
                                    verifyBorn(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <Picker
                            mode='dropdown'
                            selectedValue={gender}
                            dropdownIconColor={colors.lightBlack}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            style={{ ...styles.input, color: colors.lightBlack }}
                        >
                            <Picker.Item key={0} label='Masculino' value='Masculino' style={{ color: colors.lightBlack, backgroundColor: colors.whiteSmoke }} />
                            <Picker.Item key={1} label='Feminino' value='Feminino' style={{ color: colors.lightBlack, backgroundColor: colors.whiteSmoke }} />
                        </Picker>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='idcard' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={document}
                                placeholder={'Documento RG/CPF'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setDocument(text);
                                    verifyDocument(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>
                    </View>

                    <View style={{ ...styles.Information, marginTop: 25 }}>
                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='isv' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={adress}
                                placeholder={'Endereço Rua St.Mônica, 100'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setAdress(text);
                                    verifyAddress(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='enviromento' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={city}
                                placeholder={'Cidade & Estado Cidade de Mônica (SP)'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setCity(text);
                                    verifyCity(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='phone' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={phone}
                                placeholder={'Telefone/Celular'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setPhone(text);
                                    verifyPhone(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='mail' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={email}
                                placeholder={'Email name@email.com'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    verifyEmail(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>
                    </View>

                    <View style={{ ...styles.Information, marginTop: 25 }}>
                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='staro' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={model}
                                placeholder={'Modelo do aparelho'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setModel(text);
                                    verifyModel(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='barcode' size={18} color={colors.lightBlack} />
                            </View>

                            <TouchableOpacity
                                onPress={() => createSerialNumber()}
                                style={{ ...styles.textInput, color: colors.green }}
                            >
                                <Text style={{ color: colors.lightBlack }}>{'Toque para gerar um serial (opicional)'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='swapleft' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={dateIn}
                                placeholder={'Data de entrada (DD/MM/AAAA)'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setDateIn(text);
                                    verifyDateIn(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.whiteSmoke }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='swapright' size={18} color={colors.lightBlack} />
                            </View>

                            <TextInput
                                value={dateOut}
                                placeholder={'Data de saída (DD/MM/AAAA)'}
                                placeholderTextColor={colors.lightBlack}
                                onChangeText={(text) => {
                                    setDateOut(text);
                                    verifyDateOut(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            register(name, bornDate, gender, document, adress, city, phone, email, model, serialNumber, dateIn, dateOut);
                        }}
                        style={{ ...styles.button, marginTop: 35, marginBottom: 100 }}
                    >
                        <AntDesign name='edit' size={24} color={colors.white} />
                        <Text style={{ ...styles.iconButton, color: colors.white }}>{' Cadastrar '}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};