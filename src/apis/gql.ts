import { gql } from "@apollo/client/core";

export const SEARCH = gql`
  query search($name: String!) {
    search(searchInput: { name: $name }) {
      name
      description
      category
      img_src
    }
  }
`;

export const MODELS = gql`
  query {
    fetchModels {
      name_ko
      id
    }
  }
`;
export const MODEL = gql`
  query fetchModel($modelId: String!) {
    fetchModel(modelId: $modelId) {
      name_ko
      name_en
    }
  }
`;

export const EMAIL = gql`
  query completeEmailCheck($email: String!) {
    completeEmailCheck(email: $email)
  }
`;

export const USER = gql`
  query {
    fetchUser {
      id
      email
    }
  }
`;

export const FINDID = gql`
  mutation findId($phone: String!) {
    findId(phone: $phone)
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const RESTOREACCESSTOKEN = gql`
  mutation {
    restoreAccessToken
  }
`;

export const SIGNUP = gql`
  mutation createUser(
    $name: String!
    $phone: String!
    $email: String!
    $password: String!
    $simplePw: String!
  ) {
    createUser(
      name: $name
      phone: $phone
      email: $email
      password: $password
      simplePw: $simplePw
    ) {
      email
      name
      phone
    }
  }
`;

export const sendEmail = gql`
  mutation sendEmail($email: String!) {
    sendEmail(email: $email)
  }
`;

export const CHANGEPASSWORD = gql`
  mutation resetPasswordByEmail($email: String!, $password: String!) {
    resetPasswordByEmail(email: $email, password: $password)
  }
`;

export const LIKEADD = gql`
  mutation likeAdd($modelId: String!) {
    likeAdd(modelId: $modelId)
  }
`;

export const GETLIKES = gql`
  query getLikesNum($modelId: String!, $userEmail: String!) {
    getLikesNum(modelId: $modelId, userEmail: $userEmail) {
      isLiked
    }
  }
`;
