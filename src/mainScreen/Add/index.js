import React, { useState } from "react";
import { SafeAreaView, ScrollView,View, Text, TouchableOpacity, TextInput } from 'react-native';

// import { arquivos do firebase/firestore e react-native-picker }
import firestore from '../../config/firebase';
import { collection, doc, setDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

// Imports { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../config/colors";
import styles from "./style";

export default function AddUser({ navigation }) {
    const [add, setAdd] = useState('');
    const [name, setName] = useState('');
    const [bornDate, setBornDate] = useState('');
    const [gender, setGender] = useState('');
    const [document, setDocument] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [model, setModel] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');

    const [buttonDisable, setButtonDisable] = useState(false); // botão desabilitado

    const [tempName, setTempName] = useState('');
    const [tempBornDate, setTempBornDate] = useState('');
    const [tempGender, setTempGender] = useState('');
    const [tempDocument, setTempDocument] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [tempCity, setTempCity] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [tempModel, setTempModel] = useState('');
    const [tempSerialNumber, setTempSerialNumber] = useState('');
    const [tempDateIn, setTempDateIn] = useState('');
    const [tempDateOut, setTempDateOut] = useState('');
    const [textColor, setTextColor] = useState(colors.gray);

    // As funções abaixo, verifica todos os dados de cadastro antes de realizar o cadastro do usuário
    // para se certificar de que todos os dados estejam corretamente preenchidos

    const verifyName = (text) => {
        if (/^[^@#$%&*()!":;[]<>_=-',?]*$/.test(text)) {
            // armazena temporáriamente o texto inserido na input e faz com que o texto
            // mude para determinada cor se o dado estiver correto ou incorretamente inserido
            setTempName(text);
            setTextColor(colors.gray);
        } else {
            // Mude para determinada cor se o dado estiver correto ou incorretamente inserido
            // retorna o dado temporariamente armazenado
            setTextColor(colors.red);
            return tempName;
        };
    };

    const verifyBorn = (text) => {
        if (/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(text)) {
            // armazena temporáriamente o texto inserido na input e faz com que o texto
            // mude para determinada cor se o dado estiver correto ou incorretamente inserido
            setTempBornDate(text);
            setTextColor(colors.gray);
        } else {
            // Mude para determinada cor se o dado estiver correto ou incorretamente inserido
            // retorna o dado temporariamente armazenado
            setTextColor(colors.red);
            return tempBornDate;
        };
    };

    const verifyGender = (text) => {
        if(text === 'Masculino' || text === 'masculino' || text === 'Feminino' || text === 'feminino') {
            setTempGender(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempGender;
        };
    };

    const verifyDocument = (text) => {
        if(/^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}-[0-9]{1,2})$/.test(text)) {
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

    const verifySerialNumber = (text) => {
        if (/^[^@#$%&*!":;[]<>_='?]*$/.test(text)) {
            setTempSerialNumber(text);
            setTextColor(colors.gray);
        } else {
            setTextColor(colors.red);
            return tempSerialNumber;
        };
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

    // Adiciona o usuário ao fireStore/Database passando por parâmetro todos os dados
    // inseridos no cadastro
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
                dateOut: dateOut
            });
            navigation.navigate('Home'); // Após adicionar todos os dados ao firestore/DataBase o usuário é redirecionado para a tela inicial
        } catch (error) {
            console.log('Erro ao cadastrar o usuário: ', error);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={{width: '85%', marginTop: 30, fontStyle: 'italic', color: colors.black}}>
                        <AntDesign name='info' size={16} color={colors.black} />
                        {
                            'Para adicionar um novo cliente, preencha\n' +
                            'todos os dados corretamente e certifique-se\n' +
                            'de que tudo esteja correto, caso o contrário o\n' + 
                            'procedimento pode apresentar erros.'
                        }
                    </Text>

                    <View style={{...styles.Information, marginTop: 50}}>
                        <TextInput
                            placeholder=' Nome'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setName(text);
                                verifyName(text);
                            }}
                            value={name}
                            style={{...styles.input, color: textColor}}
                        />

                        <TextInput
                            placeholder=' Data de nascimento (DD/MM/AAAA)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setBornDate(text);
                                verifyBorn(text);
                            }}
                            value={bornDate}
                            style={{...styles.input, color: textColor}}
                        />
                        
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => {
                                setGender(itemValue);
                            }}
                            mode='dropdown'
                            dropdownIconColor={colors.lightBlack}
                            style={{...styles.input, color: colors.lightBlack}}
                        >
                            <Picker.Item key={0} label='Masculino' value='Masculino' style={{color: colors.lightBlack, backgroundColor: colors.whiteSmoke}}/>
                            <Picker.Item key={1} label='Feminino' value='Feminino' style={{color: colors.lightBlack, backgroundColor: colors.whiteSmoke}}/>
                        </Picker>

                        <TextInput
                            placeholder=' CPF (XXX.XXX.XXX-YY)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setDocument(text);
                                verifyDocument(text);
                            }}
                            value={document}
                            style={{...styles.input, color: textColor}}
                        />
                    </View>

                    <View style={{...styles.Information, marginTop: 25}}>
                        <TextInput
                            placeholder=' Endereço (Rua, Número)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setAdress(text);
                                verifyAddress(text);
                            }}
                            value={adress}
                            style={{...styles.input, color: textColor}}
                        />

                        <TextInput
                            placeholder=' Cidade & Estado (Cidade - Estado)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setCity(text);
                                verifyCity(text);
                            }}
                            value={city}
                            style={{...styles.input, color: textColor}}
                        />

                        <TextInput
                            placeholder=' Telefone (XX) XXXXX-XXXX'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setPhone(text);
                                verifyPhone(text);
                            }}
                            value={phone}
                            style={{...styles.input, color: textColor}}
                        />

                        <TextInput
                            placeholder=' Email (name@email.com)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setEmail(text);
                                verifyEmail(text);
                            }}
                            value={email}
                            style={{...styles.input, color: textColor}}
                        />
                    </View>

                    <View style={{...styles.Information, marginTop: 25}}>
                        <TextInput
                            placeholder=' Marca/Modelo do aparelho (SM-A236M/DS)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setModel(text);
                                verifyModel(text);
                            }}
                            value={model}
                            style={{...styles.input, color: textColor}}
                        />

                        <TextInput
                            placeholder=' { Número de série gerado automaticamente }'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setSerialNumber(text);
                                verifySerialNumber(text);
                            }}
                            value={serialNumber}
                            style={{...styles.input, color: textColor}}
                        />

                        <TextInput
                            placeholder=' Data de entrada do aparelho (DD/MM/AAAA)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setDateIn(text);
                                verifyDateIn(text);
                            }}
                            value={dateIn}
                            style={{...styles.input, color: textColor}}
                        />

                        <TextInput
                            placeholder=' Data de saída do aparelho (DD/MM/AAAA)'
                            placeholderTextColor={colors.lightBlack}
                            onChangeText={(text) => {
                                setDateOut(text);
                                verifyDateOut(text);
                            }}
                            value={dateOut}
                            style={{...styles.input, color: textColor}}
                        />
                    </View>

                    <TouchableOpacity
                        disabled={buttonDisable}
                        onPress={() => {
                            setAdd(true)
                            register(
                                name, 
                                bornDate, 
                                gender, 
                                document, 
                                adress, 
                                city, 
                                phone, 
                                email, 
                                model, 
                                serialNumber, 
                                dateIn, 
                                dateOut
                        )}}
                        style={{...styles.button, marginTop: 35, marginBottom: 100}}
                    >
                        <Text style={{...styles.iconButton, color: colors.black}}>
                            <AntDesign name='edit' size={24} color={colors.black} />
                            {' Cadastrar '}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};