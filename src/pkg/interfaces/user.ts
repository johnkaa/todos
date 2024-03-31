type AddressType = {
  city: string;
  geo: {
    lat: string;
    lng: string;
  };
  street: string;
  suite: string;
  zipcode: string;
};
type CompanyType = {
  bs: string;
  catchPhrase: string;
  name: string;
};
export default interface IUser {
  address: AddressType;
  company: CompanyType;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}
