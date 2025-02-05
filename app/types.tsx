 type Address =  {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

 export type User ={
  id: number; 
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
  isFavorite: boolean;
}

 type Company =  {
   bs: string;
   catchPhrase: string;
   name: string;
}


