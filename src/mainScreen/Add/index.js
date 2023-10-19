import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";

import firestore from '../../config/firebase';
import { collection, doc, setDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../config/colors";
import styles from "./style";

export default function AddUser({ navigation }) {
    const [name, setName] = useState();
    const [bornDate, setBornDate] = useState();
    const [gender, setGender] = useState("Masculino");
    const [document, setDocument] = useState();
    const [adress, setAdress] = useState();
    const [city, setCity] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [model, setModel] = useState();
    const [serialNumber, setSerialNumber] = useState();
    const [dateIn, setDateIn] = useState();
    const [dateOut, setDateOut] = useState();

    const [tempName, setTempName] = useState();
    const [tempBornDate, setTempBornDate] = useState();
    const [tempDocument, setTempDocument] = useState();
    const [tempAddress, setTempAddress] = useState();
    const [tempCity, setTempCity] = useState();
    const [tempPhone, setTempPhone] = useState();
    const [tempEmail, setTempEmail] = useState();
    const [tempModel, setTempModel] = useState();
    const [tempDateIn, setTempDateIn] = useState();
    const [tempDateOut, setTempDateOut] = useState();
    const [textColor, setTextColor] = useState(colors.bk1);

    // Verifica o nome inserido.
    const verifyName = (text) => {
        if (/^[^@#$%&*()!":;[]<>_=-',?]*$/.test(text)) {
            setTempName(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempName;
        };
    };

    // Verifica a data de nascimento inserida.
    const verifyBorn = (text) => {
        // Auto-completa o preenchimento da data de nascimento
        // inserindo barras para separar DD/MM/AAAA e verifica se a data de nascimento é válida.
        // a barra é adicionada sempre que dois valores são inseridos, (DD e MM) ex: 17 "/" 04 "/" 1996 -> 17/04/1996
        if (text.length === 2 || text.length === 5) {
            setBornDate(text + '/');
        } else if (text.length === 10 && /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(text)) {
            setTempBornDate(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempBornDate;
        }
    };

    const verifyDocument = (text) => {
        // Auto-completa o preenchimento do documento
        // inserindo pontos e traços para separar a númeração do documento CPF e verifica se o documento é válido.
        // a pontuação é adicionada sempre que três valores são inseridos ex: 000.000.000-00
        if (text.length === 3 || text.length === 7) {
            setDocument(text + '.');
        } else if (text.length === 11) {
            setDocument(text + '-');
        } else if (text.length === 14 && /^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}-[0-9]{1,2})$/.test(text)) {
            setTempDocument(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempDocument;
        }
    };

    // Valida o endereço inserido.
    const verifyAddress = (text) => {
        if (/^[^@#$%&*()!":;[]<>_=-'?]*$/.test(text)) {
            setTempAddress(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempAddress;
        };
    };

    // Valida a cidade inserida.
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
        // Auto-completa o preenchimento do número de telefone
        // inserindo parênteses e traço para separar (00) 00000-0000 e verifica se o número de telefone válido.
        // o parênteses é adicionado no início do número e após dois valores serem inseridos (00) e em seguida o traço é adicionado
        // após dez números serem digitados.
        const phone = text.length
        switch (phone) {
            case 1:
                text = "";
                setPhone("(" + text);
                break;

            case 3:
                setPhone(text + ") 9");
                break;

            case 10:
                setPhone(text + "-");
                break;

            case 15:
                if (text.length === /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(text)) {
                    setTempPhone(text);
                    setTextColor(colors.gray);
                } else {
                    setTextColor(colors.red);
                    return tempPhone;
                }
                break;
        }
    };

    // Valida o e-mail inserido.
    const verifyEmail = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempEmail(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempEmail;
        };
    };

    // Valida o modelo de aparelho inserido.
    const verifyModel = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempModel(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempModel;
        };
    };

    // Gera um número de série aleatório de 6 dígitos.
    const createSerialNumber = () => {
        const randomSerial = Math.floor(Math.random() * 900000) + 100000;
        setSerialNumber(randomSerial);
    };

    // Verifica a data de entrada do aparelho inserida pelo usuário no formulário de cadastro do aplicativo.
    const verifyDateIn = (text) => {
        // Auto-completa o preenchimento da data de entrada
        // inserindo barras para separar DD/MM/AAAA e verifica se a data de entrada é válida.
        // a barra é adicionada sempre que dois valores são inseridos, (DD e MM) ex: 10 "/" 01 "/" 2023 -> 10/01/2023
        if (text.length === 2 || text.length === 5) {
            setDateIn(text + '/');
        } else if (text.length === 10 && /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(text)) {
            setTempDateIn(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempDateIn;
        }
    };

    // Verifica a data de saída do aparelho inserida pelo usuário no formulário de cadastro do aplicativo.
    const verifyDateOut = (text) => {
        // Auto-completa o preenchimento da data de saída
        // inserindo barras para separar DD/MM/AAAA e verifica se a data de saída é válida.
        // a barra é adicionada sempre que dois valores são inseridos, (DD e MM) ex: 11 "/" 01 "/" 2023 -> 11/01/2023
        if (text.length === 2 || text.length === 5) {
            setDateOut(text + '/');
        } else if (text.length === 10 && /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(text)) {
            setTempDateOut(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempDateOut;
        }
    };


    // Adiciona o usuário ao fireStore passando por parâmetro todos os dados inseridos no cadastro.
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
            navigation.navigate('Home'); // Direciona para a tela inicial.
        } catch (error) {
            console.log('Erro ao cadastrar o usuário: ', error);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ width: "85%", marginTop: 50, display: "flex", flexDirection: "row" }}>
                        <View style={styles.boxInfo}>
                            <AntDesign name="info" size={16} color={colors.wh0} />
                        </View>

                        <Text style={styles.info}>
                            {
                                "Para adicionar um novo cliente, preencha" + "\n" +
                                "todos os dados corretamente e certifique-se" + "\n" +
                                "de que tudo esteja correto, caso o contrário o" + "\n" +
                                "procedimento pode apresentar erros."
                            }
                        </Text>
                    </View>

                    <View style={{ ...styles.Information, marginTop: 50 }}>
                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='user' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={name}
                                placeholder={'Nome e Sobrenome'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setName(text);
                                    verifyName(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='aliwangwang-o1' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={bornDate}
                                placeholder={'Data de Nascimento DD/MM/AAAA'}
                                placeholderTextColor={colors.bk1}
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
                            dropdownIconColor={colors.bk1}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            style={{ ...styles.input, color: colors.bk1 }}
                        >
                            <Picker.Item key={0} label='Masculino' value='Masculino' style={{ color: colors.bk1, backgroundColor: colors.wh1 }} />
                            <Picker.Item key={1} label='Feminino' value='Feminino' style={{ color: colors.bk1, backgroundColor: colors.wh1 }} />
                        </Picker>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='idcard' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={document}
                                placeholder={'Documento RG/CPF'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setDocument(text);
                                    verifyDocument(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>
                    </View>

                    <View style={{ ...styles.Information, marginTop: 25 }}>
                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='isv' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={adress}
                                placeholder={'Endereço do seu negócio/loja, n°'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setAdress(text);
                                    verifyAddress(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='enviromento' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={city}
                                placeholder={'Cidade (UF)'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setCity(text);
                                    verifyCity(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='phone' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={phone}
                                placeholder={'Telefone/Celular'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setPhone(text);
                                    verifyPhone(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='mail' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={email}
                                placeholder={'email@provedor.com'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    verifyEmail(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>
                    </View>

                    <View style={{ ...styles.Information, marginTop: 25 }}>
                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='staro' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={model}
                                placeholder={'Modelo do aparelho'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setModel(text);
                                    verifyModel(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='barcode' size={18} color={colors.bk1} />
                            </View>

                            <TouchableOpacity
                                onPress={() => createSerialNumber()}
                                style={{ ...styles.textInput, color: colors.gr0 }}
                            >
                                <Text style={{ color: colors.bk1 }}>{"[PRODUCT KEY, AUTOMATICALLY GENERATED]"}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='swapleft' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={dateIn}
                                placeholder={'Data de entrada (DD/MM/AAAA)'}
                                placeholderTextColor={colors.bk1}
                                onChangeText={(text) => {
                                    setDateIn(text);
                                    verifyDateIn(text);
                                }}
                                style={{ ...styles.textInput, color: textColor }}
                            />
                        </View>

                        <View style={{ ...styles.input, backgroundColor: colors.wh1 }}>
                            <View style={styles.iconContainer}>
                                <AntDesign name='swapright' size={18} color={colors.bk1} />
                            </View>

                            <TextInput
                                value={dateOut}
                                placeholder={'Data de saída (DD/MM/AAAA)'}
                                placeholderTextColor={colors.bk1}
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
                        <AntDesign name='edit' size={24} color={colors.wh0} />
                        <Text style={{ ...styles.iconButton, color: colors.wh0 }}>{' Cadastrar '}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};