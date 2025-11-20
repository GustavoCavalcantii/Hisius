export type AuthStackParamList = {
  Splash: undefined;
  Register: undefined;
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
    email: string,
    birthdate?: string,
    CPF?: string,
    gender?: string,
    phone?: string
  };
}
