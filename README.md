### Seja bem vindo! Esse é o Emmiter um projeto de código aberto para o gerenciamento de clientes utilizando o React-Native e o Google Firebase/FireStorage.

#### Se você deseja utilizar este aplicativo para o seu negócio siga as etapas abaixo:

1 - Certifique-se de ter todo o ambiente de desenvolvimento do react-native configurado na sua máquina [https://reactnative.dev/docs/getting-started]<br><br> 
2 - Baixe os arquivos do projeto ou crie um clone do projeto através do seu git, faça como preferir -<br><br>
3 - Abra o projeto no seu diretório raiz onde estará localizado o "App.js" e em seguida execute o comando "npm install ou npm i" necessário para instalar
todas as dependências que o projeto necessita para que possa ser executado sem nenhum erro e para que as suas funções funcionem devidamente.<br><br>
4 - Execute o projeto na sua máquina usando os comando "npm start" e "npx react-native run-android" (no diretório raiz do projeto)<br><br>
5 - Verifique se o projeto foi executado com sucesso ele irá carregar em um emulador no android studio ou você pode carregar diretamente de um dispositivo
android externo que possua o android 9.0 ou superior, []<br><br>

#### Você precisará adicionar a sua própria "credencial" do google firebase/firestore para que os dados cadastrados dos usuários sejam armazenados na sua conta do google firebase

- Crie uma conta no google firebase se ainda não tiver [https://firebase.google.com/?hl=pt]<br>
- Clique em "Começar ou Start" e em seguida "adicione um novo projeto" dê um nome e ele recomendamos "emmiter",
- Clique em "continuar" (não é necessário ativar o google Analitycs) assim que o seu projeto for criado, em "Visão Geral do Projeto > Configurações do Projeto"
  na aba "Seus Aplicativos" selecione a plataforma "Web" para começar, geralmente tem o ícone "</>" dê um nome ao seu app da web, em seguida um código de autenticação
  para o projeto que você acabou de criar no firebase será gerado, ele terá mais ou menos essa aparência:<br><br>

  ``  
   import { initializeApp } from "firebase/app";  
   // TODO: Add SDKs for Firebase products that you want to use  
   // https://firebase.google.com/docs/web/setup#available-libraries  
   
   // Your web app's Firebase configuration  
   const firebaseConfig = {  
     apiKey: "AIzaSyDZ17hm5ZhoG4NqMD6IwkxxofogacvT3V4",  
     authDomain: "testedid.firebaseapp.com",  
     projectId: "testedid",  
     storageBucket: "testedid.appspot.com",  
     messagingSenderId: "608368870609",  
     appId: "1:608368870609:web:07a71709ae54b8309ef1f0"  
   };  
   
   // Initialize Firebase  
   const app = initializeApp(firebaseConfig);  
  ``  
  
- Copie o objeto "firebaseConfig" com as propriedades que foram fornecidas, acima temos somente um exemplo, os valores das propriedades serão diferentes para cada
  projeto que for criado no firebase.  
  
- Agora abra, na raiz do app, o diretório "src/config/firebase.js" e substitua os dados do objeto "firebaseConfig" do app para os dados copiados do site.
- Feito isso, salve o arquivo "firebase.js" e reinicie o projeto.  

- ! Antes de fazer qualquer modificação como: Adicionar usuários, Editar ou Remover usuários, abra o console do firebase vá em "Firestore Database" e clique em
  "Criar banco de dados", marque "Iniciar em modo Produção" e em "Next", selecione um local de armazenamento dos dados, recomendado "south-america" e clique em "Ativar",
  aguarde um momento e clique em "Iniciar nova Coleção" no código da coleção digite "user" o código obrigatóriamente precisa ser "user" em letras minusculas, o mesmo vale
  para o "ID do Documento" (Deixe os "Campos" e "Valores" vazios) e clique em "Salvar"  

- ! Abra a aba "Regras" e edite as regras para que fique assim:
  (dessa maneira você permite tanto a leitura quanto a escrita no firestorage para qualquer pessoa, necessário para que o app funcione corretamente)  
  
``  
   rules_version = '2';  
   
   service cloud.firestore {  
     match /databases/{database}/documents {  
       match /{document=**} {  
         allow read, write: if true;  
       }  
     }  
   }  
``  

- ! Para testar se ocorreu tudo certo ao reiniciar o projeto no emulador ou em um dispositivo físico conectado externamente, abra a opção "Adicionar Usuário" no app
  e em seguida adicione qualquer usuário para fins de teste, em "Gerenciar usuários" você terá acesso a todos os usuários cadastrados na sua conta do firebase.  
   
Você pode baixar o arquivo .apk para android [https://github.com/AndersonLeandrog/project-emmiter/releases/tag/1.2.14-7] o arquivo é o com.android.emmiter atualmente na sua versão 1.2.14-7 Beta,
(não é aconselhável usar este apk para armazenar os dados do seu cliente, ao invés disso siga a etapa para utilizar o aplicativo para o seu negócio)  

Google Firebase: 
- O apk com.android.emmiter está vinculado a conta do desenvolvedor @andersonleandrog portanto todos os clientes que você cadastrar será
  inserido no firestorage do firebase na conta do mesmo, por esse motivo é recomendado que você siga a configuração para o seu negócio.  
  
Se você deseja utilizar este aplicativo para estudo ou modificações conforme o seu gosto siga esses etapas: []  
