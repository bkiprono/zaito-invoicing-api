/* eslint-disable @typescript-eslint/naming-convention */

import { IncomingHttpHeaders } from 'http';

export interface HttpServiceConfig {
  baseURL?: string;
  headers?: Record<string, any>;
}

export interface HttpServiceResponse<T = any> {
  protocol: string;
  hostname: string;
  path: string;
  method: string;
  headers: IncomingHttpHeaders;
  statusCode: number;
  statusMessage: string;
  data: T;
}

export interface Credentials {
  /**
   * Consumer key
   */
  clientKey: string;
  /**
   * Consumer secret
   */
  clientSecret: string;
  initiatorPassword: string;
  securityCredential?: string;
  certificatePath?: string | null;
}

export interface AuthorizeResponse {
  access_token: string;
  expires_in: string;
}

export interface B2C {
  Initiator: string;
  /**
   * The amount to be transacted.
   */
  Amount: number;
  /**
   * The Party sending the funds. Either msisdn or business short code
   */
  PartyA: string;
  /**
   * The Party receiving the funds. Either msisdn or business short code
   */
  PartyB: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to when the request times out. Must accept POST requests
   */
  QueueTimeOutURL: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to. Must accept POST requests
   */
  ResultURL: string;
  /**
   * `TransactionReversal` - Reversal for an erroneous C2B transaction.
   *
   * `SalaryPayment` - Used to send money from an employer to employees e.g. salaries
   *
   * `BusinessPayment` -	Used to send money from business to patient e.g. refunds
   *
   * `PromotionPayment` -	Used to send money when promotions take place e.g. raffle winners
   *
   * `AccountBalance` -	Used to check the balance in a paybill/buy goods account (includes utility, MMF, Merchant, Charges paid account).
   *
   * `PatientPayBillOnline` -	Used to simulate a transaction taking place in the case of C2B Simulate Transaction or to initiate a transaction on behalf of the patient (STK Push).
   *
   * `TransactionStatusQuery` -	Used to query the details of a transaction.
   *
   * `CheckIdentity` -	Similar to STK push, uses M-Pesa PIN as a service.
   *
   * `BusinessPayBill` -	Sending funds from one paybill to another paybill
   *
   * `BusinessBuyGoods` -	sending funds from buy goods to another buy goods.
   *
   * `DisburseFundsToBusiness` -	Transfer of funds from utility to MMF account.
   *
   * `BusinessToBusinessTransfer` -	Transferring funds from one paybills MMF to another paybills MMF account.
   *
   * `BusinessTransferFromMMFToUtility` -	Transferring funds from paybills MMF to another paybills utility account.
   *
   */
  CommandID: CommandID;
  Occasion?: string;
  Remarks?: string;
}

export type CommandID =
  | 'SalaryPayment'
  | 'BusinessPayment'
  | 'PromotionPayment'
  | 'AccountBalance'
  | 'TransactionStatusQuery'
  | 'TransactionReversal';

export interface B2CResponse {
  ConversationID: string;
  OriginatorConversationID: string;
  /**
   * M-Pesa Result and Response Codes
   *
   * `0` - Success
   *
   * `1` - Insufficient Funds
   *
   * `2` - Less Than Minimum Transaction Value
   *
   * `3` - More Than Maximum Transaction Value
   *
   * `4` - Would Exceed Daily Transfer Limit
   *
   * `5` - Would Exceed Minimum Balance
   *
   * `6` - Unresolved Primary Party
   *
   * `7` - Unresolved Receiver Party
   *
   * `8` - Would Exceed Maximum Balance
   *
   * `11` - Invoice Account Invalid
   *
   * `12` - Credit Account Invalid
   *
   * `13` - Unresolved Invoice Account
   *
   * `14` - Unresolved Credit Account
   *
   * `15` - Duplicate Detected
   *
   * `17` - Internal Failure
   *
   * `20` - Unresolved Initiator
   *
   * `26` - Traffic blocking condition in place
   *
   */
  ResponseCode: string;
  ResponseDescription: string;
}

export interface B2B {
  InitiatorName: string;
  /**
   * The amount to be transacted.
   */
  Amount: number;
  /**
   * The Party sending the funds. Either msisdn or business short code
   */
  PartyA: string;
  /**
   * The Party receiving the funds. Either msisdn or business short code
   */
  PartyB: string;
  /**
   * This is what the patient would enter as the account number when making payment to a paybill
   */
  AccountReference: any;
  /**
   * This is a publicly accessible url where mpesa will send the response to when the request times out. Must accept POST requests
   */
  QueueTimeOutURL: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to. Must accept POST requests
   */
  ResultURL: string;
  /**
   * `TransactionReversal` - Reversal for an erroneous C2B transaction.
   *
   * `SalaryPayment` - Used to send money from an employer to employees e.g. salaries
   *
   * `BusinessPayment` -	Used to send money from business to patient e.g. refunds
   *
   * `PromotionPayment` -	Used to send money when promotions take place e.g. raffle winners
   *
   * `AccountBalance` -	Used to check the balance in a paybill/buy goods account (includes utility, MMF, Merchant, Charges paid account).
   *
   * `PatientPayBillOnline` -	Used to simulate a transaction taking place in the case of C2B Simulate Transaction or to initiate a transaction on behalf of the patient (STK Push).
   *
   * `TransactionStatusQuery` -	Used to query the details of a transaction.
   *
   * `CheckIdentity` -	Similar to STK push, uses M-Pesa PIN as a service.
   *
   * `BusinessPayBill` -	Sending funds from one paybill to another paybill
   *
   * `BusinessBuyGoods` -	sending funds from buy goods to another buy goods.
   *
   * `DisburseFundsToBusiness` -	Transfer of funds from utility to MMF account.
   *
   * `BusinessToBusinessTransfer` -	Transferring funds from one paybills MMF to another paybills MMF account.
   *
   * `BusinessTransferFromMMFToUtility` -	Transferring funds from paybills MMF to another paybills utility account.
   *
   */
  CommandID?: string;
  /**
   * Identifier types - both sender and receiver - identify an M-Pesa transaction’s sending and receiving party as either a shortcode, a till number or a MSISDN (phone number). There are three identifier types that can be used with M-Pesa APIs.
   *
   * `1` - MSISDN
   *
   * `2` - Till Number
   *
   * `4` - Shortcode
   */
  SenderIdentifierType?: IdentifierType;
  /**
   * Identifier types - both sender and receiver - identify an M-Pesa transaction’s sending and receiving party as either a shortcode, a till number or a MSISDN (phone number). There are three identifier types that can be used with M-Pesa APIs.
   *
   * `1` - MSISDN
   *
   * `2` - Till Number
   *
   * `4` - Shortcode
   */
  RecieverIdentifierType?: IdentifierType;
  Remarks?: string;
}

export type IdentifierType = '1' | '2' | '4';

export interface AccountBalance {
  Initiator: string;
  /**
   * The Party sending the funds. Either msisdn or business short code
   */
  PartyA: string;
  /**
   * Identifier types - both sender and receiver - identify an M-Pesa transaction’s sending and receiving party as either a shortcode, a till number or a MSISDN (phone number). There are three identifier types that can be used with M-Pesa APIs.
   *
   * `1` - MSISDN
   *
   * `2` - Till Number
   *
   * `4` - Shortcode
   */
  IdentifierType: IdentifierType;
  /**
   * This is a publicly accessible url where mpesa will send the response to when the request times out. Must accept POST requests
   */
  QueueTimeOutURL: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to. Must accept POST requests
   */
  ResultURL: string;
  /**
   * `TransactionReversal` - Reversal for an erroneous C2B transaction.
   *
   * `SalaryPayment` - Used to send money from an employer to employees e.g. salaries
   *
   * `BusinessPayment` -	Used to send money from business to patient e.g. refunds
   *
   * `PromotionPayment` -	Used to send money when promotions take place e.g. raffle winners
   *
   * `AccountBalance` -	Used to check the balance in a paybill/buy goods account (includes utility, MMF, Merchant, Charges paid account).
   *
   * `PatientPayBillOnline` -	Used to simulate a transaction taking place in the case of C2B Simulate Transaction or to initiate a transaction on behalf of the patient (STK Push).
   *
   * `TransactionStatusQuery` -	Used to query the details of a transaction.
   *
   * `CheckIdentity` -	Similar to STK push, uses M-Pesa PIN as a service.
   *
   * `BusinessPayBill` -	Sending funds from one paybill to another paybill
   *
   * `BusinessBuyGoods` -	sending funds from buy goods to another buy goods.
   *
   * `DisburseFundsToBusiness` -	Transfer of funds from utility to MMF account.
   *
   * `BusinessToBusinessTransfer` -	Transferring funds from one paybills MMF to another paybills MMF account.
   *
   * `BusinessTransferFromMMFToUtility` -	Transferring funds from paybills MMF to another paybills utility account.
   *
   */
  CommandID: CommandID;
  Remarks?: string;
}

export interface AccountBalanceResponse {
  OriginatorConversationID: string;
  ConversationID: string;
  /**
   * M-Pesa Result and Response Codes
   *
   * `0` - Success
   *
   * `1` - Insufficient Funds
   *
   * `2` - Less Than Minimum Transaction Value
   *
   * `3` - More Than Maximum Transaction Value
   *
   * `4` - Would Exceed Daily Transfer Limit
   *
   * `5` - Would Exceed Minimum Balance
   *
   * `6` - Unresolved Primary Party
   *
   * `7` - Unresolved Receiver Party
   *
   * `8` - Would Exceed Maxiumum Balance
   *
   * `11` - Invoice Account Invalid
   *
   * `12` - Credit Account Invalid
   *
   * `13` - Unresolved Invoice Account
   *
   * `14` - Unresolved Credit Account
   *
   * `15` - Duplicate Detected
   *
   * `17` - Internal Failure
   *
   * `20` - Unresolved Initiator
   *
   * `26` - Traffic blocking condition in place
   *
   */
  ResponseCode: string;
  ResponseDescription: string;
}

export interface TransactionStatus {
  Initiator: string;
  TransactionID: string;
  /**
   * The Party sending the funds. Either msisdn or business short code
   */
  PartyA: string;
  /**
   * Identifier types - both sender and receiver - identify an M-Pesa transaction’s sending and receiving party as either a shortcode, a till number or a MSISDN (phone number). There are three identifier types that can be used with M-Pesa APIs.
   *
   * `1` - MSISDN
   *
   * `2` - Till Number
   *
   * `4` - Shortcode
   */
  IdentifierType: IdentifierType;
  /**
   * This is a publicly accessible url where mpesa will send the response to. Must accept POST requests
   */
  ResultURL: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to when the request times out. Must accept POST requests
   */
  QueueTimeOutURL: string;
  /**
   * `TransactionReversal` - Reversal for an erroneous C2B transaction.
   *
   * `SalaryPayment` - Used to send money from an employer to employees e.g. salaries
   *
   * `BusinessPayment` -	Used to send money from business to patient e.g. refunds
   *
   * `PromotionPayment` -	Used to send money when promotions take place e.g. raffle winners
   *
   * `AccountBalance` -	Used to check the balance in a paybill/buy goods account (includes utility, MMF, Merchant, Charges paid account).
   *
   * `PatientPayBillOnline` -	Used to simulate a transaction taking place in the case of C2B Simulate Transaction or to initiate a transaction on behalf of the patient (STK Push).
   *
   * `TransactionStatusQuery` -	Used to query the details of a transaction.
   *
   * `CheckIdentity` -	Similar to STK push, uses M-Pesa PIN as a service.
   *
   * `BusinessPayBill` -	Sending funds from one paybill to another paybill
   *
   * `BusinessBuyGoods` -	sending funds from buy goods to another buy goods.
   *
   * `DisburseFundsToBusiness` -	Transfer of funds from utility to MMF account.
   *
   * `BusinessToBusinessTransfer` -	Transferring funds from one paybills MMF to another paybills MMF account.
   *
   * `BusinessTransferFromMMFToUtility` -	Transferring funds from paybills MMF to another paybills utility account.
   *
   */
  CommandID?: CommandID;
  Remarks?: string;
  Occasion?: string;
}

export interface TransactionStatusResponse {
  OriginatorConversationID: string;
  ConversationID: string;
  /**
   * M-Pesa Result and Response Codes
   *
   * `0` - Success
   *
   * `1` - Insufficient Funds
   *
   * `2` - Less Than Minimum Transaction Value
   *
   * `3` - More Than Maximum Transaction Value
   *
   * `4` - Would Exceed Daily Transfer Limit
   *
   * `5` - Would Exceed Minimum Balance
   *
   * `6` - Unresolved Primary Party
   *
   * `7` - Unresolved Receiver Party
   *
   * `8` - Would Exceed Maxiumum Balance
   *
   * `11` - Invoice Account Invalid
   *
   * `12` - Credit Account Invalid
   *
   * `13` - Unresolved Invoice Account
   *
   * `14` - Unresolved Credit Account
   *
   * `15` - Duplicate Detected
   *
   * `17` - Internal Failure
   *
   * `20` - Unresolved Initiator
   *
   * `26` - Traffic blocking condition in place
   *
   */
  ResponseCode: string;
  ResponseDescription: string;
}
export interface Reversal {
  Initiator: string;
  TransactionID: string;
  /**
   * The amount to be transacted.
   */
  Amount: number;
  ReceiverParty: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to. Must accept POST requests
   */
  ResultURL: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to when the request times out. Must accept POST requests
   */
  QueueTimeOutURL: string;
  /**
   * `TransactionReversal` - Reversal for an erroneous C2B transaction.
   *
   * `SalaryPayment` - Used to send money from an employer to employees e.g. salaries
   *
   * `BusinessPayment` -	Used to send money from business to patient e.g. refunds
   *
   * `PromotionPayment` -	Used to send money when promotions take place e.g. raffle winners
   *
   * `AccountBalance` -	Used to check the balance in a paybill/buy goods account (includes utility, MMF, Merchant, Charges paid account).
   *
   * `PatientPayBillOnline` -	Used to simulate a transaction taking place in the case of C2B Simulate Transaction or to initiate a transaction on behalf of the patient (STK Push).
   *
   * `TransactionStatusQuery` -	Used to query the details of a transaction.
   *
   * `CheckIdentity` -	Similar to STK push, uses M-Pesa PIN as a service.
   *
   * `BusinessPayBill` -	Sending funds from one paybill to another paybill
   *
   * `BusinessBuyGoods` -	sending funds from buy goods to another buy goods.
   *
   * `DisburseFundsToBusiness` -	Transfer of funds from utility to MMF account.
   *
   * `BusinessToBusinessTransfer` -	Transferring funds from one paybills MMF to another paybills MMF account.
   *
   * `BusinessTransferFromMMFToUtility` -	Transferring funds from paybills MMF to another paybills utility account.
   *
   */
  CommandID: CommandID;
  /**
   * Identifier types - both sender and receiver - identify an M-Pesa transaction’s sending and receiving party as either a shortcode, a till number or a MSISDN (phone number). There are three identifier types that can be used with M-Pesa APIs.
   *
   * `1` - MSISDN
   *
   * `2` - Till Number
   *
   * `4` - Shortcode
   */
  RecieverIdentifierType?: '1' | '2' | '4';
  Remarks?: string;
  Occasion?: string;
}

export interface ReversalResponse {
  OriginatorConversationID: string;
  ConversationID: string;
  /**
   * M-Pesa Result and Response Codes
   *
   * `0` - Success
   *
   * `1` - Insufficient Funds
   *
   * `2` - Less Than Minimum Transaction Value
   *
   * `3` - More Than Maximum Transaction Value
   *
   * `4` - Would Exceed Daily Transfer Limit
   *
   * `5` - Would Exceed Minimum Balance
   *
   * `6` - Unresolved Primary Party
   *
   * `7` - Unresolved Receiver Party
   *
   * `8` - Would Exceed Maxiumum Balance
   *
   * `11` - Invoice Account Invalid
   *
   * `12` - Credit Account Invalid
   *
   * `13` - Unresolved Invoice Account
   *
   * `14` - Unresolved Credit Account
   *
   * `15` - Duplicate Detected
   *
   * `17` - Internal Failure
   *
   * `20` - Unresolved Initiator
   *
   * `26` - Traffic blocking condition in place
   *
   */
  ResponseCode: string;
  ResponseDescription: string;
}

export interface StkPush {
  /**
   * The organization shortcode used to receive the transaction.
   */
  BusinessShortCode: number;
  /**
   * The amount to be transacted.
   */
  Amount: number;
  /**
   * The Party sending the funds. Either msisdn or business short code
   */
  PartyA: string;
  /**
   * The Party receiving the funds. Either msisdn or business short code
   */
  PartyB: string;
  /**
   * The MSISDN of the involved party
   */
  PhoneNumber: string;
  /**
   * This is a publicly accessible url where mpesa will send the response to. Must accept POST requests
   */
  CallBackURL: string;
  /**
   * This is what the patient would enter as the account number when making payment to a paybill
   */
  AccountReference: string;
  /**
   * Lipa Na Mpesa Pass Key.
   */
  passKey: string;
  TransactionType?: TransactionType;
  TransactionDesc?: string;
}

export type TransactionType = 'PatientPayBillOnline' | 'PatientBuyGoodsOnline';

export interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  /**
   * M-Pesa Result and Response Codes
   *
   * `0` - Success
   *
   * `1` - Insufficient Funds
   *
   * `2` - Less Than Minimum Transaction Value
   *
   * `3` - More Than Maximum Transaction Value
   *
   * `4` - Would Exceed Daily Transfer Limit
   *
   * `5` - Would Exceed Minimum Balance
   *
   * `6` - Unresolved Primary Party
   *
   * `7` - Unresolved Receiver Party
   *
   * `8` - Would Exceed Maxiumum Balance
   *
   * `11` - Invoice Account Invalid
   *
   * `12` - Credit Account Invalid
   *
   * `13` - Unresolved Invoice Account
   *
   * `14` - Unresolved Credit Account
   *
   * `15` - Duplicate Detected
   *
   * `17` - Internal Failure
   *
   * `20` - Unresolved Initiator
   *
   * `26` - Traffic blocking condition in place
   *
   */
  ResponseCode: string;
  ResponseDescription: string;
  PatientMessage: string;
}

export interface StkQuery {
  /**
   * The organization shortcode used to receive the transaction.
   */
  BusinessShortCode: number;
  CheckoutRequestID: string;
  passKey: any;
}

export interface StkQueryResponse {
  /**
   * M-Pesa Result and Response Codes
   *
   * `0` - Success
   *
   * `1` - Insufficient Funds
   *
   * `2` - Less Than Minimum Transaction Value
   *
   * `3` - More Than Maximum Transaction Value
   *
   * `4` - Would Exceed Daily Transfer Limit
   *
   * `5` - Would Exceed Minimum Balance
   *
   * `6` - Unresolved Primary Party
   *
   * `7` - Unresolved Receiver Party
   *
   * `8` - Would Exceed Maxiumum Balance
   *
   * `11` - Invoice Account Invalid
   *
   * `12` - Credit Account Invalid
   *
   * `13` - Unresolved Invoice Account
   *
   * `14` - Unresolved Credit Account
   *
   * `15` - Duplicate Detected
   *
   * `17` - Internal Failure
   *
   * `20` - Unresolved Initiator
   *
   * `26` - Traffic blocking condition in place
   *
   */
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: string;
  ResultDesc: string;
}
export interface C2BRegister {
  ShortCode: number;
  /**
   * This is a publicly accessible url where mpesa will send the confirmation to. Must accept POST requests
   */
  ConfirmationURL: string;
  /**
   * This is a publicly accessible url where mpesa will send the validation to. Must accept POST requests
   */
  ValidationURL: string;
  ResponseType: ResponseType;
}

export type ResponseType = 'Completed' | 'Cancelled';

export interface C2BRegisterResponse {
  ConversationID: string;
  OriginatorCoversationID: string;
  ResponseDescription: string;
}

export interface C2BSimulate {
  /**
   * `TransactionReversal` - Reversal for an erroneous C2B transaction.
   *
   * `SalaryPayment` - Used to send money from an employer to employees e.g. salaries
   *
   * `BusinessPayment` -	Used to send money from business to patient e.g. refunds
   *
   * `PromotionPayment` -	Used to send money when promotions take place e.g. raffle winners
   *
   * `AccountBalance` -	Used to check the balance in a paybill/buy goods account (includes utility, MMF, Merchant, Charges paid account).
   *
   * `PatientPayBillOnline` -	Used to simulate a transaction taking place in the case of C2B Simulate Transaction or to initiate a transaction on behalf of the patient (STK Push).
   *
   * `TransactionStatusQuery` -	Used to query the details of a transaction.
   *
   * `CheckIdentity` -	Similar to STK push, uses M-Pesa PIN as a service.
   *
   * `BusinessPayBill` -	Sending funds from one paybill to another paybill
   *
   * `BusinessBuyGoods` -	sending funds from buy goods to another buy goods.
   *
   * `DisburseFundsToBusiness` -	Transfer of funds from utility to MMF account.
   *
   * `BusinessToBusinessTransfer` -	Transferring funds from one paybills MMF to another paybills MMF account.
   *
   * `BusinessTransferFromMMFToUtility` -	Transferring funds from paybills MMF to another paybills utility account.
   *
   */
  CommandID: TransactionType;
  /**
   * The amount to be transacted.
   */
  Amount: number;
  /**
   * Phone number
   */
  Msisdn: number;
  BillRefNumber?: any;
  ShortCode: number;
}

export interface C2BSimulateResponse {
  ConversationID: string;
  OriginatorCoversationID: string;
  ResponseDescription: string;
}
