/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { type ScalarsEnumsHash } from "gqty";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
}

export interface adminNoteCreateInput {
  messageId: Scalars["Int"]["input"];
  note: Scalars["String"]["input"];
}

export interface adminNotesInput {
  messageId: Scalars["Int"]["input"];
}

export interface adminUserLoginInput {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}

export interface changeAdminUserPasswordInput {
  id: Scalars["Int"]["input"];
  newPassword: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}

export interface changeAppUserPasswordInput {
  id: Scalars["Int"]["input"];
  newPassword: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}

export interface createAdminUserInput {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role: Scalars["String"]["input"];
  userName: Scalars["String"]["input"];
}

export interface createAppUserInput {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  userName: Scalars["String"]["input"];
}

export interface createCategoryInput {
  categoryName: Scalars["String"]["input"];
  parentCategoryId?: InputMaybe<Scalars["Int"]["input"]>;
}

export interface createCompanyInput {
  companyEmail: Scalars["String"]["input"];
  companyName: Scalars["String"]["input"];
  companyPhone: Scalars["String"]["input"];
}

export interface createMessageInput {
  appUserId: Scalars["Int"]["input"];
  companyId: Scalars["Int"]["input"];
  messageHeader: Scalars["String"]["input"];
  messageText: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  productId: Scalars["Int"]["input"];
}

export interface createProductInput {
  brand?: InputMaybe<Scalars["String"]["input"]>;
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  onAd?: InputMaybe<Scalars["Boolean"]["input"]>;
  origin?: InputMaybe<Scalars["String"]["input"]>;
  productName: Scalars["String"]["input"];
  surfaceTreatment?: InputMaybe<Scalars["String"]["input"]>;
  thickness?: InputMaybe<Scalars["String"]["input"]>;
  widths?: InputMaybe<Scalars["String"]["input"]>;
}

export interface getProductOfCategoryInput {
  categoryId: Scalars["Int"]["input"];
}

export interface getWithId {
  id: Scalars["Int"]["input"];
}

export interface updateAdminUserInput {
  id: Scalars["Int"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  userName?: InputMaybe<Scalars["String"]["input"]>;
}

export interface updateAppUserInput {
  id: Scalars["Int"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  userName?: InputMaybe<Scalars["String"]["input"]>;
}

export interface updateCategoryInput {
  categoryName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  parentCategoryId?: InputMaybe<Scalars["Int"]["input"]>;
}

export interface updateCompanyInput {
  companyName: Scalars["String"]["input"];
  companyPhone: Scalars["String"]["input"];
  id: Scalars["Int"]["input"];
}

export interface updateMessageInput {
  id: Scalars["Int"]["input"];
  isReturn?: InputMaybe<Scalars["Boolean"]["input"]>;
}

export interface updateProductInput {
  brand?: InputMaybe<Scalars["String"]["input"]>;
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  image?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  onAd?: InputMaybe<Scalars["Boolean"]["input"]>;
  origin?: InputMaybe<Scalars["String"]["input"]>;
  productName?: InputMaybe<Scalars["String"]["input"]>;
  surfaceTreatment?: InputMaybe<Scalars["String"]["input"]>;
  thickness?: InputMaybe<Scalars["String"]["input"]>;
  widths?: InputMaybe<Scalars["String"]["input"]>;
}

export const scalarsEnumsHash: ScalarsEnumsHash = { Boolean: true, Int: true, String: true };
export const generatedSchema = { AdminNote: { __typename: { __type: "String!" }, adminUser: { __type: "AdminUser" }, company: { __type: "Company" }, createdAt: { __type: "String" }, id: { __type: "Int!" }, message: { __type: "Message" }, note: { __type: "String" }, updatedAt: { __type: "String" } }, AdminUser: { __typename: { __type: "String!" }, company: { __type: "Company!" }, createdAt: { __type: "String!" }, email: { __type: "String!" }, id: { __type: "Int!" }, isRoot: { __type: "Boolean" }, password: { __type: "String!" }, phone: { __type: "String" }, role: { __type: "String!" }, updatedAt: { __type: "String!" }, userName: { __type: "String!" } }, AppUser: { __typename: { __type: "String!" }, createdAt: { __type: "String" }, email: { __type: "String!" }, id: { __type: "Int!" }, messages: { __type: "[Message]" }, password: { __type: "String" }, phone: { __type: "String" }, updatedAt: { __type: "String" }, userName: { __type: "String!" } }, Category: { __typename: { __type: "String!" }, categoryName: { __type: "String!" }, createdAt: { __type: "String!" }, fullPathName: { __type: "String" }, id: { __type: "Int!" }, parentCategory: { __type: "Category" }, products: { __type: "[Product]" }, subcategories: { __type: "[Category]" }, updatedAt: { __type: "String!" } }, Company: { __typename: { __type: "String!" }, adminUsers: { __type: "[AdminUser]" }, companyEmail: { __type: "String!" }, companyName: { __type: "String!" }, companyPhone: { __type: "String!" }, createdAt: { __type: "String" }, id: { __type: "Int" }, messages: { __type: "[Message]" }, products: { __type: "[Product]" }, updatedAt: { __type: "String" } }, Hello: { __typename: { __type: "String!" }, adnan: { __type: "String" }, hello: { __type: "String" } }, Message: { __typename: { __type: "String!" }, adminNotes: { __type: "[AdminNote]" }, appUser: { __type: "AppUser" }, company: { __type: "Company" }, createdAt: { __type: "String" }, id: { __type: "Int!" }, isReturn: { __type: "Boolean" }, messageHeader: { __type: "String!" }, messageText: { __type: "String!" }, phone: { __type: "String" }, product: { __type: "Product" }, returnedAdmin: { __type: "AdminUser" }, updatedAt: { __type: "String" } }, Product: { __typename: { __type: "String!" }, adDate: { __type: "String" }, brand: { __type: "String" }, category: { __type: "Category" }, color: { __type: "String" }, company: { __type: "Company" }, createdAt: { __type: "String" }, description: { __type: "String" }, id: { __type: "Int" }, image: { __type: "String" }, length: { __type: "String" }, location: { __type: "String" }, onAd: { __type: "Boolean" }, origin: { __type: "String" }, productName: { __type: "String" }, surfaceTreatment: { __type: "String" }, thickness: { __type: "String" }, updatedAt: { __type: "String" }, widths: { __type: "String" } }, adminNoteCreateInput: { messageId: { __type: "Int!" }, note: { __type: "String!" } }, adminNotesInput: { messageId: { __type: "Int!" } }, adminUserLoginInput: { email: { __type: "String!" }, password: { __type: "String!" } }, changeAdminUserPasswordInput: { id: { __type: "Int!" }, newPassword: { __type: "String!" }, password: { __type: "String!" } }, changeAppUserPasswordInput: { id: { __type: "Int!" }, newPassword: { __type: "String!" }, password: { __type: "String!" } }, createAdminUserInput: { email: { __type: "String!" }, password: { __type: "String!" }, phone: { __type: "String" }, role: { __type: "String!" }, userName: { __type: "String!" } }, createAppUserInput: { email: { __type: "String!" }, password: { __type: "String!" }, phone: { __type: "String" }, userName: { __type: "String!" } }, createCategoryInput: { categoryName: { __type: "String!" }, parentCategoryId: { __type: "Int" } }, createCompanyInput: { companyEmail: { __type: "String!" }, companyName: { __type: "String!" }, companyPhone: { __type: "String!" } }, createMessageInput: { appUserId: { __type: "Int!" }, companyId: { __type: "Int!" }, messageHeader: { __type: "String!" }, messageText: { __type: "String!" }, phone: { __type: "String" }, productId: { __type: "Int!" } }, createProductInput: { brand: { __type: "String" }, categoryId: { __type: "Int" }, color: { __type: "String" }, description: { __type: "String" }, image: { __type: "String" }, length: { __type: "String" }, location: { __type: "String" }, onAd: { __type: "Boolean" }, origin: { __type: "String" }, productName: { __type: "String!" }, surfaceTreatment: { __type: "String" }, thickness: { __type: "String" }, widths: { __type: "String" } }, getProductOfCategoryInput: { categoryId: { __type: "Int!" } }, getWithId: { id: { __type: "Int!" } }, msg: { __typename: { __type: "String!" }, msg: { __type: "String" }, status: { __type: "Boolean" } }, mutation: { __typename: { __type: "String!" }, adminNoteCreate: { __type: "AdminNote", __args: { input: "adminNoteCreateInput" } }, adminNoteDelete: { __type: "msg", __args: { input: "getWithId" } }, adminUserChangePassword: { __type: "msg", __args: { input: "changeAdminUserPasswordInput" } }, adminUserCreate: { __type: "AdminUser", __args: { input: "createAdminUserInput" } }, adminUserDelete: { __type: "msg", __args: { input: "getWithId" } }, adminUserLogin: { __type: "AdminUser", __args: { input: "adminUserLoginInput" } }, adminUserUpdate: { __type: "AdminUser", __args: { input: "updateAdminUserInput" } }, appUserChangePassword: { __type: "msg", __args: { input: "changeAppUserPasswordInput" } }, appUserCreate: { __type: "AppUser", __args: { input: "createAppUserInput" } }, appUserDelete: { __type: "msg", __args: { input: "getWithId" } }, appUserUpdate: { __type: "AppUser", __args: { input: "updateAppUserInput" } }, createCategory: { __type: "Category", __args: { input: "createCategoryInput" } }, createCompany: { __type: "Company", __args: { input: "createCompanyInput" } }, createProduct: { __type: "Product", __args: { input: "createProductInput" } }, deleteCategory: { __type: "msg", __args: { input: "getWithId" } }, deleteCompany: { __type: "msg", __args: { input: "getWithId" } }, deleteProduct: { __type: "msg", __args: { input: "getWithId" } }, messageCreate: { __type: "msg", __args: { input: "createMessageInput" } }, messageDelete: { __type: "msg", __args: { input: "getWithId" } }, messageUpdate: { __type: "Message", __args: { input: "updateMessageInput" } }, sayHello2: { __type: "Hello" }, updateCategory: { __type: "Category", __args: { input: "updateCategoryInput" } }, updateCompany: { __type: "Company", __args: { input: "updateCompanyInput" } }, updateProduct: { __type: "Product", __args: { input: "updateProductInput" } } }, query: { __typename: { __type: "String!" }, adminNotesOfMessage: { __type: "[AdminNote]", __args: { input: "adminNotesInput" } }, adminUserGet: { __type: "AdminUser", __args: { input: "getWithId" } }, adminUserGetAll: { __type: "[AdminUser]" }, adminUsersOfCompany: { __type: "[AdminUser]" }, appUserGet: { __type: "AppUser", __args: { input: "getWithId" } }, appUsersGetAll: { __type: "[AppUser]" }, categoryGetAll: { __type: "[Category]" }, categoryLeafs: { __type: "[Category]" }, getAllCategoryTree: { __type: "[Category]" }, getAllCompany: { __type: "[Company]" }, getCategory: { __type: "Category", __args: { input: "getWithId" } }, getCategoryWithSubcategories: { __type: "Category", __args: { input: "getWithId" } }, getCompanyWithUsers: { __type: "Company", __args: { input: "getWithId" } }, getLogs: { __type: "[String]" }, getProduct: { __type: "Product", __args: { input: "getWithId" } }, getProductOfCategory: { __type: "[Product]", __args: { input: "getProductOfCategoryInput" } }, messageGet: { __type: "Message", __args: { input: "getWithId" } }, messagesOfCompany: { __type: "[Message]" }, productsOfCompany: { __type: "[Product]" }, sayHello: { __type: "Hello" } }, subscription: {}, updateAdminUserInput: { id: { __type: "Int!" }, phone: { __type: "String" }, role: { __type: "String" }, userName: { __type: "String" } }, updateAppUserInput: { id: { __type: "Int!" }, phone: { __type: "String" }, userName: { __type: "String" } }, updateCategoryInput: { categoryName: { __type: "String" }, id: { __type: "Int!" }, parentCategoryId: { __type: "Int" } }, updateCompanyInput: { companyName: { __type: "String!" }, companyPhone: { __type: "String!" }, id: { __type: "Int!" } }, updateMessageInput: { id: { __type: "Int!" }, isReturn: { __type: "Boolean" } }, updateProductInput: { brand: { __type: "String" }, categoryId: { __type: "Int" }, color: { __type: "String" }, description: { __type: "String" }, id: { __type: "Int!" }, image: { __type: "String" }, length: { __type: "String" }, location: { __type: "String" }, onAd: { __type: "Boolean" }, origin: { __type: "String" }, productName: { __type: "String" }, surfaceTreatment: { __type: "String" }, thickness: { __type: "String" }, widths: { __type: "String" } } } as const;

export interface AdminNote {
  __typename?: "AdminNote";
  adminUser?: Maybe<AdminUser>;
  company?: Maybe<Company>;
  createdAt?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["Int"];
  message?: Maybe<Message>;
  note?: Maybe<ScalarsEnums["String"]>;
  updatedAt?: Maybe<ScalarsEnums["String"]>;
}

export interface AdminUser {
  __typename?: "AdminUser";
  company: Company;
  createdAt: ScalarsEnums["String"];
  email: ScalarsEnums["String"];
  id: ScalarsEnums["Int"];
  isRoot?: Maybe<ScalarsEnums["Boolean"]>;
  password: ScalarsEnums["String"];
  phone?: Maybe<ScalarsEnums["String"]>;
  role: ScalarsEnums["String"];
  updatedAt: ScalarsEnums["String"];
  userName: ScalarsEnums["String"];
}

export interface AppUser {
  __typename?: "AppUser";
  createdAt?: Maybe<ScalarsEnums["String"]>;
  email: ScalarsEnums["String"];
  id: ScalarsEnums["Int"];
  messages?: Maybe<Array<Maybe<Message>>>;
  password?: Maybe<ScalarsEnums["String"]>;
  phone?: Maybe<ScalarsEnums["String"]>;
  updatedAt?: Maybe<ScalarsEnums["String"]>;
  userName: ScalarsEnums["String"];
}

export interface Category {
  __typename?: "Category";
  categoryName: ScalarsEnums["String"];
  createdAt: ScalarsEnums["String"];
  fullPathName?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["Int"];
  parentCategory?: Maybe<Category>;
  products?: Maybe<Array<Maybe<Product>>>;
  subcategories?: Maybe<Array<Maybe<Category>>>;
  updatedAt: ScalarsEnums["String"];
}

export interface Company {
  __typename?: "Company";
  adminUsers?: Maybe<Array<Maybe<AdminUser>>>;
  companyEmail: ScalarsEnums["String"];
  companyName: ScalarsEnums["String"];
  companyPhone: ScalarsEnums["String"];
  createdAt?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  updatedAt?: Maybe<ScalarsEnums["String"]>;
}

export interface Hello {
  __typename?: "Hello";
  adnan?: Maybe<ScalarsEnums["String"]>;
  hello?: Maybe<ScalarsEnums["String"]>;
}

export interface Message {
  __typename?: "Message";
  adminNotes?: Maybe<Array<Maybe<AdminNote>>>;
  appUser?: Maybe<AppUser>;
  company?: Maybe<Company>;
  createdAt?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["Int"];
  isReturn?: Maybe<ScalarsEnums["Boolean"]>;
  messageHeader: ScalarsEnums["String"];
  messageText: ScalarsEnums["String"];
  phone?: Maybe<ScalarsEnums["String"]>;
  product?: Maybe<Product>;
  returnedAdmin?: Maybe<AdminUser>;
  updatedAt?: Maybe<ScalarsEnums["String"]>;
}

export interface Product {
  __typename?: "Product";
  adDate?: Maybe<ScalarsEnums["String"]>;
  brand?: Maybe<ScalarsEnums["String"]>;
  category?: Maybe<Category>;
  color?: Maybe<ScalarsEnums["String"]>;
  company?: Maybe<Company>;
  createdAt?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  image?: Maybe<ScalarsEnums["String"]>;
  length?: Maybe<ScalarsEnums["String"]>;
  location?: Maybe<ScalarsEnums["String"]>;
  onAd?: Maybe<ScalarsEnums["Boolean"]>;
  origin?: Maybe<ScalarsEnums["String"]>;
  productName?: Maybe<ScalarsEnums["String"]>;
  surfaceTreatment?: Maybe<ScalarsEnums["String"]>;
  thickness?: Maybe<ScalarsEnums["String"]>;
  updatedAt?: Maybe<ScalarsEnums["String"]>;
  widths?: Maybe<ScalarsEnums["String"]>;
}

export interface msg {
  __typename?: "msg";
  msg?: Maybe<ScalarsEnums["String"]>;
  status?: Maybe<ScalarsEnums["Boolean"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  adminNoteCreate: (args?: { input?: Maybe<adminNoteCreateInput> }) => Maybe<AdminNote>;
  adminNoteDelete: (args?: { input?: Maybe<getWithId> }) => Maybe<msg>;
  adminUserChangePassword: (args?: { input?: Maybe<changeAdminUserPasswordInput> }) => Maybe<msg>;
  adminUserCreate: (args?: { input?: Maybe<createAdminUserInput> }) => Maybe<AdminUser>;
  adminUserDelete: (args?: { input?: Maybe<getWithId> }) => Maybe<msg>;
  adminUserLogin: (args?: { input?: Maybe<adminUserLoginInput> }) => Maybe<AdminUser>;
  adminUserUpdate: (args?: { input?: Maybe<updateAdminUserInput> }) => Maybe<AdminUser>;
  appUserChangePassword: (args?: { input?: Maybe<changeAppUserPasswordInput> }) => Maybe<msg>;
  appUserCreate: (args?: { input?: Maybe<createAppUserInput> }) => Maybe<AppUser>;
  appUserDelete: (args?: { input?: Maybe<getWithId> }) => Maybe<msg>;
  appUserUpdate: (args?: { input?: Maybe<updateAppUserInput> }) => Maybe<AppUser>;
  createCategory: (args?: { input?: Maybe<createCategoryInput> }) => Maybe<Category>;
  createCompany: (args?: { input?: Maybe<createCompanyInput> }) => Maybe<Company>;
  createProduct: (args?: { input?: Maybe<createProductInput> }) => Maybe<Product>;
  deleteCategory: (args?: { input?: Maybe<getWithId> }) => Maybe<msg>;
  deleteCompany: (args?: { input?: Maybe<getWithId> }) => Maybe<msg>;
  deleteProduct: (args?: { input?: Maybe<getWithId> }) => Maybe<msg>;
  messageCreate: (args?: { input?: Maybe<createMessageInput> }) => Maybe<msg>;
  messageDelete: (args?: { input?: Maybe<getWithId> }) => Maybe<msg>;
  messageUpdate: (args?: { input?: Maybe<updateMessageInput> }) => Maybe<Message>;
  sayHello2?: Maybe<Hello>;
  updateCategory: (args?: { input?: Maybe<updateCategoryInput> }) => Maybe<Category>;
  updateCompany: (args?: { input?: Maybe<updateCompanyInput> }) => Maybe<Company>;
  updateProduct: (args?: { input?: Maybe<updateProductInput> }) => Maybe<Product>;
}

export interface Query {
  __typename?: "Query";
  adminNotesOfMessage: (args?: { input?: Maybe<adminNotesInput> }) => Maybe<Array<Maybe<AdminNote>>>;
  adminUserGet: (args?: { input?: Maybe<getWithId> }) => Maybe<AdminUser>;
  adminUserGetAll?: Maybe<Array<Maybe<AdminUser>>>;
  adminUsersOfCompany?: Maybe<Array<Maybe<AdminUser>>>;
  appUserGet: (args?: { input?: Maybe<getWithId> }) => Maybe<AppUser>;
  appUsersGetAll?: Maybe<Array<Maybe<AppUser>>>;
  categoryGetAll?: Maybe<Array<Maybe<Category>>>;
  categoryLeafs?: Maybe<Array<Maybe<Category>>>;
  getAllCategoryTree?: Maybe<Array<Maybe<Category>>>;
  getAllCompany?: Maybe<Array<Maybe<Company>>>;
  getCategory: (args?: { input?: Maybe<getWithId> }) => Maybe<Category>;
  getCategoryWithSubcategories: (args?: { input?: Maybe<getWithId> }) => Maybe<Category>;
  getCompanyWithUsers: (args?: { input?: Maybe<getWithId> }) => Maybe<Company>;
  getLogs?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  getProduct: (args?: { input?: Maybe<getWithId> }) => Maybe<Product>;
  getProductOfCategory: (args?: { input?: Maybe<getProductOfCategoryInput> }) => Maybe<Array<Maybe<Product>>>;
  messageGet: (args?: { input?: Maybe<getWithId> }) => Maybe<Message>;
  messagesOfCompany?: Maybe<Array<Maybe<Message>>>;
  productsOfCompany?: Maybe<Array<Maybe<Product>>>;
  sayHello?: Maybe<Hello>;
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type ScalarsEnums = {
  [Key in keyof Scalars]: Scalars[Key] extends { output: unknown } ? Scalars[Key]["output"] : never;
} & {};
