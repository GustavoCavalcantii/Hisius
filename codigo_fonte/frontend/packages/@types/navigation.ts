export type AuthStackParamList = {
  Splash: undefined;
  Signin: undefined;
  Login: undefined;
};

export type AppStackParamList = {
  Home: {
    id: string;
  };
  Screening: { 
    id: string 
  };
  Atendance: { 
    id: string
  };
  Profile: { 
    id: string,
    name: string,
    email: string,
    password: string
  };
}


//quando for navegar para alguma dessas telas elas precisam receber os 
//parametros tipados aqui☝