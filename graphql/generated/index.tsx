import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO-8601 encoded UTC date time string. Example value: `"2019-07-03T20:47:55Z"`. */
  DateTime: any;
  /** A signed decimal number, which supports arbitrary precision and is serialized as a string. Example value: `"29.99"`. */
  Decimal: any;
  /** A string containing HTML code. Example value: `"<p>Grey cotton knit sweater.</p>"`. */
  HTML: any;
  /** A monetary value string. Example value: `"100.57"`. */
  Money: any;
  /**
   * An RFC 3986 and RFC 3987 compliant URI string.
   * 
   * Example value: `"https://johns-apparel.myshopify.com"`.
   * 
   */
  URL: any;
};

/** A version of the API. */
export type ShopifyApiVersion = {
   __typename?: 'ApiVersion';
  /** The human-readable name of the version. */
  displayName: Scalars['String'];
  /** The unique identifier of an ApiVersion. All supported API versions have a date-based (YYYY-MM) or `unstable` handle. */
  handle: Scalars['String'];
  /** Whether the version is supported by Shopify. */
  supported: Scalars['Boolean'];
};

/** Details about the gift card used on the checkout. */
export type ShopifyAppliedGiftCard = ShopifyNode & {
   __typename?: 'AppliedGiftCard';
  /**
   * The amount that was taken from the gift card by applying it.
   * @deprecated Use `amountUsedV2` instead
   */
  amountUsed: Scalars['Money'];
  /** The amount that was taken from the gift card by applying it. */
  amountUsedV2: ShopifyMoneyV2;
  /**
   * The amount left on the gift card.
   * @deprecated Use `balanceV2` instead
   */
  balance: Scalars['Money'];
  /** The amount left on the gift card. */
  balanceV2: ShopifyMoneyV2;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The last characters of the gift card. */
  lastCharacters: Scalars['String'];
  /** The amount that was applied to the checkout in its currency. */
  presentmentAmountUsed: ShopifyMoneyV2;
};

/** An article in an online store blog. */
export type ShopifyArticle = ShopifyNode & {
   __typename?: 'Article';
  /**
   * The article's author.
   * @deprecated Use `authorV2` instead
   */
  author: ShopifyArticleAuthor;
  /** The article's author. */
  authorV2?: Maybe<ShopifyArticleAuthor>;
  /** The blog that the article belongs to. */
  blog: ShopifyBlog;
  /** List of comments posted on the article. */
  comments: ShopifyCommentConnection;
  /** Stripped content of the article, single line with HTML tags removed. */
  content: Scalars['String'];
  /** The content of the article, complete with HTML formatting. */
  contentHtml: Scalars['HTML'];
  /** Stripped excerpt of the article, single line with HTML tags removed. */
  excerpt?: Maybe<Scalars['String']>;
  /** The excerpt of the article, complete with HTML formatting. */
  excerptHtml?: Maybe<Scalars['HTML']>;
  /** A human-friendly unique string for the Article automatically generated from its title. */
  handle: Scalars['String'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The image associated with the article. */
  image?: Maybe<ShopifyImage>;
  /** The date and time when the article was published. */
  publishedAt: Scalars['DateTime'];
  /** The article’s SEO information. */
  seo?: Maybe<ShopifySeo>;
  /** A categorization that a article can be tagged with. */
  tags: Array<Scalars['String']>;
  /** The article’s name. */
  title: Scalars['String'];
  /** The url pointing to the article accessible from the web. */
  url: Scalars['URL'];
};


/** An article in an online store blog. */
export type ShopifyArticleCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** An article in an online store blog. */
export type ShopifyArticleContentArgs = {
  truncateAt?: Maybe<Scalars['Int']>;
};


/** An article in an online store blog. */
export type ShopifyArticleExcerptArgs = {
  truncateAt?: Maybe<Scalars['Int']>;
};


/** An article in an online store blog. */
export type ShopifyArticleImageArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  crop?: Maybe<ShopifyCropRegion>;
  scale?: Maybe<Scalars['Int']>;
};

/** The author of an article. */
export type ShopifyArticleAuthor = {
   __typename?: 'ArticleAuthor';
  /** The author's bio. */
  bio?: Maybe<Scalars['String']>;
  /** The author’s email. */
  email: Scalars['String'];
  /** The author's first name. */
  firstName: Scalars['String'];
  /** The author's last name. */
  lastName: Scalars['String'];
  /** The author's full name. */
  name: Scalars['String'];
};

export type ShopifyArticleConnection = {
   __typename?: 'ArticleConnection';
  /** A list of edges. */
  edges: Array<ShopifyArticleEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyArticleEdge = {
   __typename?: 'ArticleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of ArticleEdge. */
  node: ShopifyArticle;
};

/** The set of valid sort keys for the Article query. */
export enum ShopifyArticleSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `blog_title` value. */
  BlogTitle = 'BLOG_TITLE',
  /** Sort by the `author` value. */
  Author = 'AUTHOR',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `published_at` value. */
  PublishedAt = 'PUBLISHED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/** Represents a generic custom attribute. */
export type ShopifyAttribute = {
   __typename?: 'Attribute';
  /** Key or name of the attribute. */
  key: Scalars['String'];
  /** Value of the attribute. */
  value?: Maybe<Scalars['String']>;
};

/** Specifies the input fields required for an attribute. */
export type ShopifyAttributeInput = {
  /** Key or name of the attribute. */
  key: Scalars['String'];
  /** Value of the attribute. */
  value: Scalars['String'];
};

/** Automatic discount applications capture the intentions of a discount that was automatically applied. */
export type ShopifyAutomaticDiscountApplication = ShopifyDiscountApplication & {
   __typename?: 'AutomaticDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyDiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyDiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyDiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars['String'];
  /** The value of the discount application. */
  value: ShopifyPricingValue;
};

/** A collection of available shipping rates for a checkout. */
export type ShopifyAvailableShippingRates = {
   __typename?: 'AvailableShippingRates';
  /**
   * Whether or not the shipping rates are ready.
   * The `shippingRates` field is `null` when this value is `false`.
   * This field should be polled until its value becomes `true`.
   */
  ready: Scalars['Boolean'];
  /** The fetched shipping rates. `null` until the `ready` field is `true`. */
  shippingRates?: Maybe<Array<ShopifyShippingRate>>;
};

/** An online store blog. */
export type ShopifyBlog = ShopifyNode & {
   __typename?: 'Blog';
  /** Find an article by its handle. */
  articleByHandle?: Maybe<ShopifyArticle>;
  /** List of the blog's articles. */
  articles: ShopifyArticleConnection;
  /** The authors who have contributed to the blog. */
  authors: Array<ShopifyArticleAuthor>;
  /** A human-friendly unique string for the Blog automatically generated from its title. */
  handle: Scalars['String'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The blogs’s title. */
  title: Scalars['String'];
  /** The url pointing to the blog accessible from the web. */
  url: Scalars['URL'];
};


/** An online store blog. */
export type ShopifyBlogArticleByHandleArgs = {
  handle: Scalars['String'];
};


/** An online store blog. */
export type ShopifyBlogArticlesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyArticleSortKeys>;
  query?: Maybe<Scalars['String']>;
};

export type ShopifyBlogConnection = {
   __typename?: 'BlogConnection';
  /** A list of edges. */
  edges: Array<ShopifyBlogEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyBlogEdge = {
   __typename?: 'BlogEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of BlogEdge. */
  node: ShopifyBlog;
};

/** The set of valid sort keys for the Blog query. */
export enum ShopifyBlogSortKeys {
  /** Sort by the `handle` value. */
  Handle = 'HANDLE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export enum ShopifyCardBrand {
  /** Visa */
  Visa = 'VISA',
  /** Mastercard */
  Mastercard = 'MASTERCARD',
  /** Discover */
  Discover = 'DISCOVER',
  /** American Express */
  AmericanExpress = 'AMERICAN_EXPRESS',
  /** Diners Club */
  DinersClub = 'DINERS_CLUB',
  /** JCB */
  Jcb = 'JCB'
}

/** A container for all the information required to checkout items and pay. */
export type ShopifyCheckout = ShopifyNode & {
   __typename?: 'Checkout';
  /** The gift cards used on the checkout. */
  appliedGiftCards: Array<ShopifyAppliedGiftCard>;
  /**
   * The available shipping rates for this Checkout.
   * Should only be used when checkout `requiresShipping` is `true` and
   * the shipping address is valid.
   */
  availableShippingRates?: Maybe<ShopifyAvailableShippingRates>;
  /** The date and time when the checkout was completed. */
  completedAt?: Maybe<Scalars['DateTime']>;
  /** The date and time when the checkout was created. */
  createdAt: Scalars['DateTime'];
  /** The currency code for the Checkout. */
  currencyCode: ShopifyCurrencyCode;
  /** A list of extra information that is added to the checkout. */
  customAttributes: Array<ShopifyAttribute>;
  /**
   * The customer associated with the checkout.
   * @deprecated This field will always return null. If you have an authentication token for the customer, you can use the `customer` field on the query root to retrieve it.
   */
  customer?: Maybe<ShopifyCustomer>;
  /** Discounts that have been applied on the checkout. */
  discountApplications: ShopifyDiscountApplicationConnection;
  /** The email attached to this checkout. */
  email?: Maybe<Scalars['String']>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems: ShopifyCheckoutLineItemConnection;
  /** The sum of all the prices of all the items in the checkout. Duties, taxes, shipping and discounts excluded. */
  lineItemsSubtotalPrice: ShopifyMoneyV2;
  /** The note associated with the checkout. */
  note?: Maybe<Scalars['String']>;
  /** The resulting order from a paid checkout. */
  order?: Maybe<ShopifyOrder>;
  /** The Order Status Page for this Checkout, null when checkout is not completed. */
  orderStatusUrl?: Maybe<Scalars['URL']>;
  /**
   * The amount left to be paid. This is equal to the cost of the line items, taxes and shipping minus discounts and gift cards.
   * @deprecated Use `paymentDueV2` instead
   */
  paymentDue: Scalars['Money'];
  /** The amount left to be paid. This is equal to the cost of the line items, duties, taxes and shipping minus discounts and gift cards. */
  paymentDueV2: ShopifyMoneyV2;
  /**
   * Whether or not the Checkout is ready and can be completed. Checkouts may
   * have asynchronous operations that can take time to finish. If you want
   * to complete a checkout or ensure all the fields are populated and up to
   * date, polling is required until the value is true.
   */
  ready: Scalars['Boolean'];
  /** States whether or not the fulfillment requires shipping. */
  requiresShipping: Scalars['Boolean'];
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: Maybe<ShopifyMailingAddress>;
  /** The discounts that have been allocated onto the shipping line by discount applications. */
  shippingDiscountAllocations: Array<ShopifyDiscountAllocation>;
  /** Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object. */
  shippingLine?: Maybe<ShopifyShippingRate>;
  /**
   * Price of the checkout before shipping and taxes.
   * @deprecated Use `subtotalPriceV2` instead
   */
  subtotalPrice: Scalars['Money'];
  /** Price of the checkout before duties, shipping and taxes. */
  subtotalPriceV2: ShopifyMoneyV2;
  /** Specifies if the Checkout is tax exempt. */
  taxExempt: Scalars['Boolean'];
  /** Specifies if taxes are included in the line item and shipping line prices. */
  taxesIncluded: Scalars['Boolean'];
  /**
   * The sum of all the prices of all the items in the checkout, taxes and discounts included.
   * @deprecated Use `totalPriceV2` instead
   */
  totalPrice: Scalars['Money'];
  /** The sum of all the prices of all the items in the checkout, duties, taxes and discounts included. */
  totalPriceV2: ShopifyMoneyV2;
  /**
   * The sum of all the taxes applied to the line items and shipping lines in the checkout.
   * @deprecated Use `totalTaxV2` instead
   */
  totalTax: Scalars['Money'];
  /** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
  totalTaxV2: ShopifyMoneyV2;
  /** The date and time when the checkout was last updated. */
  updatedAt: Scalars['DateTime'];
  /** The url pointing to the checkout accessible from the web. */
  webUrl: Scalars['URL'];
};


/** A container for all the information required to checkout items and pay. */
export type ShopifyCheckoutDiscountApplicationsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** A container for all the information required to checkout items and pay. */
export type ShopifyCheckoutLineItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};

/** Specifies the fields required to update a checkout's attributes. */
export type ShopifyCheckoutAttributesUpdateInput = {
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: Maybe<Scalars['String']>;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<Array<ShopifyAttributeInput>>;
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of the addresses is still done at complete time.
   */
  allowPartialAddresses?: Maybe<Scalars['Boolean']>;
};

/** Return type for `checkoutAttributesUpdate` mutation. */
export type ShopifyCheckoutAttributesUpdatePayload = {
   __typename?: 'CheckoutAttributesUpdatePayload';
  /** The updated checkout object. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Specifies the fields required to update a checkout's attributes. */
export type ShopifyCheckoutAttributesUpdateV2Input = {
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: Maybe<Scalars['String']>;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<Array<ShopifyAttributeInput>>;
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of the addresses is still done at complete time.
   */
  allowPartialAddresses?: Maybe<Scalars['Boolean']>;
};

/** Return type for `checkoutAttributesUpdateV2` mutation. */
export type ShopifyCheckoutAttributesUpdateV2Payload = {
   __typename?: 'CheckoutAttributesUpdateV2Payload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCompleteFree` mutation. */
export type ShopifyCheckoutCompleteFreePayload = {
   __typename?: 'CheckoutCompleteFreePayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCompleteWithCreditCard` mutation. */
export type ShopifyCheckoutCompleteWithCreditCardPayload = {
   __typename?: 'CheckoutCompleteWithCreditCardPayload';
  /** The checkout on which the payment was applied. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyPayment>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCompleteWithCreditCardV2` mutation. */
export type ShopifyCheckoutCompleteWithCreditCardV2Payload = {
   __typename?: 'CheckoutCompleteWithCreditCardV2Payload';
  /** The checkout on which the payment was applied. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyPayment>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCompleteWithTokenizedPayment` mutation. */
export type ShopifyCheckoutCompleteWithTokenizedPaymentPayload = {
   __typename?: 'CheckoutCompleteWithTokenizedPaymentPayload';
  /** The checkout on which the payment was applied. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyPayment>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCompleteWithTokenizedPaymentV2` mutation. */
export type ShopifyCheckoutCompleteWithTokenizedPaymentV2Payload = {
   __typename?: 'CheckoutCompleteWithTokenizedPaymentV2Payload';
  /** The checkout on which the payment was applied. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyPayment>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCompleteWithTokenizedPaymentV3` mutation. */
export type ShopifyCheckoutCompleteWithTokenizedPaymentV3Payload = {
   __typename?: 'CheckoutCompleteWithTokenizedPaymentV3Payload';
  /** The checkout on which the payment was applied. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyPayment>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Specifies the fields required to create a checkout. */
export type ShopifyCheckoutCreateInput = {
  /** The email with which the customer wants to checkout. */
  email?: Maybe<Scalars['String']>;
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems?: Maybe<Array<ShopifyCheckoutLineItemInput>>;
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: Maybe<ShopifyMailingAddressInput>;
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: Maybe<Scalars['String']>;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<Array<ShopifyAttributeInput>>;
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of addresses is still done at complete time.
   */
  allowPartialAddresses?: Maybe<Scalars['Boolean']>;
  /**
   * The three-letter currency code of one of the shop's enabled presentment currencies.
   * Including this field creates a checkout in the specified currency. By default, new
   * checkouts are created in the shop's primary currency.
   */
  presentmentCurrencyCode?: Maybe<ShopifyCurrencyCode>;
};

/** Return type for `checkoutCreate` mutation. */
export type ShopifyCheckoutCreatePayload = {
   __typename?: 'CheckoutCreatePayload';
  /** The new checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCustomerAssociate` mutation. */
export type ShopifyCheckoutCustomerAssociatePayload = {
   __typename?: 'CheckoutCustomerAssociatePayload';
  /** The updated checkout object. */
  checkout: ShopifyCheckout;
  /** The associated customer object. */
  customer?: Maybe<ShopifyCustomer>;
  /** List of errors that occurred executing the mutation. */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCustomerAssociateV2` mutation. */
export type ShopifyCheckoutCustomerAssociateV2Payload = {
   __typename?: 'CheckoutCustomerAssociateV2Payload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /** The associated customer object. */
  customer?: Maybe<ShopifyCustomer>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCustomerDisassociate` mutation. */
export type ShopifyCheckoutCustomerDisassociatePayload = {
   __typename?: 'CheckoutCustomerDisassociatePayload';
  /** The updated checkout object. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutCustomerDisassociateV2` mutation. */
export type ShopifyCheckoutCustomerDisassociateV2Payload = {
   __typename?: 'CheckoutCustomerDisassociateV2Payload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutDiscountCodeApply` mutation. */
export type ShopifyCheckoutDiscountCodeApplyPayload = {
   __typename?: 'CheckoutDiscountCodeApplyPayload';
  /** The updated checkout object. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutDiscountCodeApplyV2` mutation. */
export type ShopifyCheckoutDiscountCodeApplyV2Payload = {
   __typename?: 'CheckoutDiscountCodeApplyV2Payload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutDiscountCodeRemove` mutation. */
export type ShopifyCheckoutDiscountCodeRemovePayload = {
   __typename?: 'CheckoutDiscountCodeRemovePayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutEmailUpdate` mutation. */
export type ShopifyCheckoutEmailUpdatePayload = {
   __typename?: 'CheckoutEmailUpdatePayload';
  /** The checkout object with the updated email. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutEmailUpdateV2` mutation. */
export type ShopifyCheckoutEmailUpdateV2Payload = {
   __typename?: 'CheckoutEmailUpdateV2Payload';
  /** The checkout object with the updated email. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Possible error codes that could be returned by CheckoutUserError. */
export enum ShopifyCheckoutErrorCode {
  /** Input value is blank. */
  Blank = 'BLANK',
  /** Input value is invalid. */
  Invalid = 'INVALID',
  /** Input value is too long. */
  TooLong = 'TOO_LONG',
  /** Input value is not present. */
  Present = 'PRESENT',
  /** Input value should be less than maximum allowed value. */
  LessThan = 'LESS_THAN',
  /** Input value should be greater than or equal to minimum allowed value. */
  GreaterThanOrEqualTo = 'GREATER_THAN_OR_EQUAL_TO',
  /** Input value should be less or equal to maximum allowed value. */
  LessThanOrEqualTo = 'LESS_THAN_OR_EQUAL_TO',
  /** Checkout is already completed. */
  AlreadyCompleted = 'ALREADY_COMPLETED',
  /** Checkout is locked. */
  Locked = 'LOCKED',
  /** Input value is not supported. */
  NotSupported = 'NOT_SUPPORTED',
  /** Input email contains an invalid domain name. */
  BadDomain = 'BAD_DOMAIN',
  /** Input Zip is invalid for country provided. */
  InvalidForCountry = 'INVALID_FOR_COUNTRY',
  /** Input Zip is invalid for country and province provided. */
  InvalidForCountryAndProvince = 'INVALID_FOR_COUNTRY_AND_PROVINCE',
  /** Invalid state in country. */
  InvalidStateInCountry = 'INVALID_STATE_IN_COUNTRY',
  /** Invalid province in country. */
  InvalidProvinceInCountry = 'INVALID_PROVINCE_IN_COUNTRY',
  /** Invalid region in country. */
  InvalidRegionInCountry = 'INVALID_REGION_IN_COUNTRY',
  /** Shipping rate expired. */
  ShippingRateExpired = 'SHIPPING_RATE_EXPIRED',
  /** Gift card cannot be applied to a checkout that contains a gift card. */
  GiftCardUnusable = 'GIFT_CARD_UNUSABLE',
  /** Gift card is disabled. */
  GiftCardDisabled = 'GIFT_CARD_DISABLED',
  /** Gift card code is invalid. */
  GiftCardCodeInvalid = 'GIFT_CARD_CODE_INVALID',
  /** Gift card has already been applied. */
  GiftCardAlreadyApplied = 'GIFT_CARD_ALREADY_APPLIED',
  /** Gift card currency does not match checkout currency. */
  GiftCardCurrencyMismatch = 'GIFT_CARD_CURRENCY_MISMATCH',
  /** Gift card is expired. */
  GiftCardExpired = 'GIFT_CARD_EXPIRED',
  /** Gift card has no funds left. */
  GiftCardDepleted = 'GIFT_CARD_DEPLETED',
  /** Gift card was not found. */
  GiftCardNotFound = 'GIFT_CARD_NOT_FOUND',
  /** Cart does not meet discount requirements notice. */
  CartDoesNotMeetDiscountRequirementsNotice = 'CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE',
  /** Discount expired. */
  DiscountExpired = 'DISCOUNT_EXPIRED',
  /** Discount disabled. */
  DiscountDisabled = 'DISCOUNT_DISABLED',
  /** Discount limit reached. */
  DiscountLimitReached = 'DISCOUNT_LIMIT_REACHED',
  /** Discount not found. */
  DiscountNotFound = 'DISCOUNT_NOT_FOUND',
  /** Customer already used once per customer discount notice. */
  CustomerAlreadyUsedOncePerCustomerDiscountNotice = 'CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE',
  /** Checkout is already completed. */
  Empty = 'EMPTY',
  /** Not enough in stock. */
  NotEnoughInStock = 'NOT_ENOUGH_IN_STOCK',
  /** Missing payment input. */
  MissingPaymentInput = 'MISSING_PAYMENT_INPUT',
  /** The amount of the payment does not match the value to be paid. */
  TotalPriceMismatch = 'TOTAL_PRICE_MISMATCH',
  /** Line item was not found in checkout. */
  LineItemNotFound = 'LINE_ITEM_NOT_FOUND',
  /** Unable to apply discount. */
  UnableToApply = 'UNABLE_TO_APPLY',
  /** Discount already applied. */
  DiscountAlreadyApplied = 'DISCOUNT_ALREADY_APPLIED'
}

/** Return type for `checkoutGiftCardApply` mutation. */
export type ShopifyCheckoutGiftCardApplyPayload = {
   __typename?: 'CheckoutGiftCardApplyPayload';
  /** The updated checkout object. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutGiftCardRemove` mutation. */
export type ShopifyCheckoutGiftCardRemovePayload = {
   __typename?: 'CheckoutGiftCardRemovePayload';
  /** The updated checkout object. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutGiftCardRemoveV2` mutation. */
export type ShopifyCheckoutGiftCardRemoveV2Payload = {
   __typename?: 'CheckoutGiftCardRemoveV2Payload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutGiftCardsAppend` mutation. */
export type ShopifyCheckoutGiftCardsAppendPayload = {
   __typename?: 'CheckoutGiftCardsAppendPayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** A single line item in the checkout, grouped by variant and attributes. */
export type ShopifyCheckoutLineItem = ShopifyNode & {
   __typename?: 'CheckoutLineItem';
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes: Array<ShopifyAttribute>;
  /** The discounts that have been allocated onto the checkout line item by discount applications. */
  discountAllocations: Array<ShopifyDiscountAllocation>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The quantity of the line item. */
  quantity: Scalars['Int'];
  /** Title of the line item. Defaults to the product's title. */
  title: Scalars['String'];
  /** Unit price of the line item. */
  unitPrice?: Maybe<ShopifyMoneyV2>;
  /** Product variant of the line item. */
  variant?: Maybe<ShopifyProductVariant>;
};

export type ShopifyCheckoutLineItemConnection = {
   __typename?: 'CheckoutLineItemConnection';
  /** A list of edges. */
  edges: Array<ShopifyCheckoutLineItemEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyCheckoutLineItemEdge = {
   __typename?: 'CheckoutLineItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of CheckoutLineItemEdge. */
  node: ShopifyCheckoutLineItem;
};

/** Specifies the input fields to create a line item on a checkout. */
export type ShopifyCheckoutLineItemInput = {
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: Maybe<Array<ShopifyAttributeInput>>;
  /** The quantity of the line item. */
  quantity: Scalars['Int'];
  /** The identifier of the product variant for the line item. */
  variantId: Scalars['ID'];
};

/** Specifies the input fields to update a line item on the checkout. */
export type ShopifyCheckoutLineItemUpdateInput = {
  /** The identifier of the line item. */
  id?: Maybe<Scalars['ID']>;
  /** The variant identifier of the line item. */
  variantId?: Maybe<Scalars['ID']>;
  /** The quantity of the line item. */
  quantity?: Maybe<Scalars['Int']>;
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: Maybe<Array<ShopifyAttributeInput>>;
};

/** Return type for `checkoutLineItemsAdd` mutation. */
export type ShopifyCheckoutLineItemsAddPayload = {
   __typename?: 'CheckoutLineItemsAddPayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutLineItemsRemove` mutation. */
export type ShopifyCheckoutLineItemsRemovePayload = {
   __typename?: 'CheckoutLineItemsRemovePayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutLineItemsReplace` mutation. */
export type ShopifyCheckoutLineItemsReplacePayload = {
   __typename?: 'CheckoutLineItemsReplacePayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  userErrors: Array<ShopifyCheckoutUserError>;
};

/** Return type for `checkoutLineItemsUpdate` mutation. */
export type ShopifyCheckoutLineItemsUpdatePayload = {
   __typename?: 'CheckoutLineItemsUpdatePayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutShippingAddressUpdate` mutation. */
export type ShopifyCheckoutShippingAddressUpdatePayload = {
   __typename?: 'CheckoutShippingAddressUpdatePayload';
  /** The updated checkout object. */
  checkout: ShopifyCheckout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutShippingAddressUpdateV2` mutation. */
export type ShopifyCheckoutShippingAddressUpdateV2Payload = {
   __typename?: 'CheckoutShippingAddressUpdateV2Payload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `checkoutShippingLineUpdate` mutation. */
export type ShopifyCheckoutShippingLineUpdatePayload = {
   __typename?: 'CheckoutShippingLineUpdatePayload';
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyCheckout>;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: Array<ShopifyCheckoutUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Represents an error that happens during execution of a checkout mutation. */
export type ShopifyCheckoutUserError = ShopifyDisplayableError & {
   __typename?: 'CheckoutUserError';
  /** Error code to uniquely identify the error. */
  code?: Maybe<ShopifyCheckoutErrorCode>;
  /** Path to the input field which caused the error. */
  field?: Maybe<Array<Scalars['String']>>;
  /** The error message. */
  message: Scalars['String'];
};

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyCollection = ShopifyNode & {
   __typename?: 'Collection';
  /** Stripped description of the collection, single line with HTML tags removed. */
  description: Scalars['String'];
  /** The description of the collection, complete with HTML formatting. */
  descriptionHtml: Scalars['HTML'];
  /**
   * A human-friendly unique string for the collection automatically generated from its title.
   * Limit of 255 characters.
   */
  handle: Scalars['String'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** Image associated with the collection. */
  image?: Maybe<ShopifyImage>;
  /** List of products in the collection. */
  products: ShopifyProductConnection;
  /** The collection’s name. Limit of 255 characters. */
  title: Scalars['String'];
  /** The date and time when the collection was last modified. */
  updatedAt: Scalars['DateTime'];
};


/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyCollectionDescriptionArgs = {
  truncateAt?: Maybe<Scalars['Int']>;
};


/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyCollectionImageArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  crop?: Maybe<ShopifyCropRegion>;
  scale?: Maybe<Scalars['Int']>;
};


/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyCollectionProductsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyProductCollectionSortKeys>;
};

export type ShopifyCollectionConnection = {
   __typename?: 'CollectionConnection';
  /** A list of edges. */
  edges: Array<ShopifyCollectionEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyCollectionEdge = {
   __typename?: 'CollectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of CollectionEdge. */
  node: ShopifyCollection;
};

/** The set of valid sort keys for the Collection query. */
export enum ShopifyCollectionSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/** A comment on an article. */
export type ShopifyComment = ShopifyNode & {
   __typename?: 'Comment';
  /** The comment’s author. */
  author: ShopifyCommentAuthor;
  /** Stripped content of the comment, single line with HTML tags removed. */
  content: Scalars['String'];
  /** The content of the comment, complete with HTML formatting. */
  contentHtml: Scalars['HTML'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
};


/** A comment on an article. */
export type ShopifyCommentContentArgs = {
  truncateAt?: Maybe<Scalars['Int']>;
};

/** The author of a comment. */
export type ShopifyCommentAuthor = {
   __typename?: 'CommentAuthor';
  /** The author's email. */
  email: Scalars['String'];
  /** The author’s name. */
  name: Scalars['String'];
};

export type ShopifyCommentConnection = {
   __typename?: 'CommentConnection';
  /** A list of edges. */
  edges: Array<ShopifyCommentEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyCommentEdge = {
   __typename?: 'CommentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of CommentEdge. */
  node: ShopifyComment;
};

/** ISO 3166-1 alpha-2 country codes with some differences. */
export enum ShopifyCountryCode {
  /** Afghanistan. */
  Af = 'AF',
  /** Åland Islands. */
  Ax = 'AX',
  /** Albania. */
  Al = 'AL',
  /** Algeria. */
  Dz = 'DZ',
  /** Andorra. */
  Ad = 'AD',
  /** Angola. */
  Ao = 'AO',
  /** Anguilla. */
  Ai = 'AI',
  /** Antigua & Barbuda. */
  Ag = 'AG',
  /** Argentina. */
  Ar = 'AR',
  /** Armenia. */
  Am = 'AM',
  /** Aruba. */
  Aw = 'AW',
  /** Australia. */
  Au = 'AU',
  /** Austria. */
  At = 'AT',
  /** Azerbaijan. */
  Az = 'AZ',
  /** Bahamas. */
  Bs = 'BS',
  /** Bahrain. */
  Bh = 'BH',
  /** Bangladesh. */
  Bd = 'BD',
  /** Barbados. */
  Bb = 'BB',
  /** Belarus. */
  By = 'BY',
  /** Belgium. */
  Be = 'BE',
  /** Belize. */
  Bz = 'BZ',
  /** Benin. */
  Bj = 'BJ',
  /** Bermuda. */
  Bm = 'BM',
  /** Bhutan. */
  Bt = 'BT',
  /** Bolivia. */
  Bo = 'BO',
  /** Bosnia & Herzegovina. */
  Ba = 'BA',
  /** Botswana. */
  Bw = 'BW',
  /** Bouvet Island. */
  Bv = 'BV',
  /** Brazil. */
  Br = 'BR',
  /** British Indian Ocean Territory. */
  Io = 'IO',
  /** Brunei. */
  Bn = 'BN',
  /** Bulgaria. */
  Bg = 'BG',
  /** Burkina Faso. */
  Bf = 'BF',
  /** Burundi. */
  Bi = 'BI',
  /** Cambodia. */
  Kh = 'KH',
  /** Canada. */
  Ca = 'CA',
  /** Cape Verde. */
  Cv = 'CV',
  /** Caribbean Netherlands. */
  Bq = 'BQ',
  /** Cayman Islands. */
  Ky = 'KY',
  /** Central African Republic. */
  Cf = 'CF',
  /** Chad. */
  Td = 'TD',
  /** Chile. */
  Cl = 'CL',
  /** China. */
  Cn = 'CN',
  /** Christmas Island. */
  Cx = 'CX',
  /** Cocos (Keeling) Islands. */
  Cc = 'CC',
  /** Colombia. */
  Co = 'CO',
  /** Comoros. */
  Km = 'KM',
  /** Congo - Brazzaville. */
  Cg = 'CG',
  /** Congo - Kinshasa. */
  Cd = 'CD',
  /** Cook Islands. */
  Ck = 'CK',
  /** Costa Rica. */
  Cr = 'CR',
  /** Croatia. */
  Hr = 'HR',
  /** Cuba. */
  Cu = 'CU',
  /** Curaçao. */
  Cw = 'CW',
  /** Cyprus. */
  Cy = 'CY',
  /** Czechia. */
  Cz = 'CZ',
  /** Côte d’Ivoire. */
  Ci = 'CI',
  /** Denmark. */
  Dk = 'DK',
  /** Djibouti. */
  Dj = 'DJ',
  /** Dominica. */
  Dm = 'DM',
  /** Dominican Republic. */
  Do = 'DO',
  /** Ecuador. */
  Ec = 'EC',
  /** Egypt. */
  Eg = 'EG',
  /** El Salvador. */
  Sv = 'SV',
  /** Equatorial Guinea. */
  Gq = 'GQ',
  /** Eritrea. */
  Er = 'ER',
  /** Estonia. */
  Ee = 'EE',
  /** Eswatini. */
  Sz = 'SZ',
  /** Ethiopia. */
  Et = 'ET',
  /** Falkland Islands. */
  Fk = 'FK',
  /** Faroe Islands. */
  Fo = 'FO',
  /** Fiji. */
  Fj = 'FJ',
  /** Finland. */
  Fi = 'FI',
  /** France. */
  Fr = 'FR',
  /** French Guiana. */
  Gf = 'GF',
  /** French Polynesia. */
  Pf = 'PF',
  /** French Southern Territories. */
  Tf = 'TF',
  /** Gabon. */
  Ga = 'GA',
  /** Gambia. */
  Gm = 'GM',
  /** Georgia. */
  Ge = 'GE',
  /** Germany. */
  De = 'DE',
  /** Ghana. */
  Gh = 'GH',
  /** Gibraltar. */
  Gi = 'GI',
  /** Greece. */
  Gr = 'GR',
  /** Greenland. */
  Gl = 'GL',
  /** Grenada. */
  Gd = 'GD',
  /** Guadeloupe. */
  Gp = 'GP',
  /** Guatemala. */
  Gt = 'GT',
  /** Guernsey. */
  Gg = 'GG',
  /** Guinea. */
  Gn = 'GN',
  /** Guinea-Bissau. */
  Gw = 'GW',
  /** Guyana. */
  Gy = 'GY',
  /** Haiti. */
  Ht = 'HT',
  /** Heard & McDonald Islands. */
  Hm = 'HM',
  /** Vatican City. */
  Va = 'VA',
  /** Honduras. */
  Hn = 'HN',
  /** Hong Kong SAR China. */
  Hk = 'HK',
  /** Hungary. */
  Hu = 'HU',
  /** Iceland. */
  Is = 'IS',
  /** India. */
  In = 'IN',
  /** Indonesia. */
  Id = 'ID',
  /** Iran. */
  Ir = 'IR',
  /** Iraq. */
  Iq = 'IQ',
  /** Ireland. */
  Ie = 'IE',
  /** Isle of Man. */
  Im = 'IM',
  /** Israel. */
  Il = 'IL',
  /** Italy. */
  It = 'IT',
  /** Jamaica. */
  Jm = 'JM',
  /** Japan. */
  Jp = 'JP',
  /** Jersey. */
  Je = 'JE',
  /** Jordan. */
  Jo = 'JO',
  /** Kazakhstan. */
  Kz = 'KZ',
  /** Kenya. */
  Ke = 'KE',
  /** Kiribati. */
  Ki = 'KI',
  /** North Korea. */
  Kp = 'KP',
  /** Kosovo. */
  Xk = 'XK',
  /** Kuwait. */
  Kw = 'KW',
  /** Kyrgyzstan. */
  Kg = 'KG',
  /** Laos. */
  La = 'LA',
  /** Latvia. */
  Lv = 'LV',
  /** Lebanon. */
  Lb = 'LB',
  /** Lesotho. */
  Ls = 'LS',
  /** Liberia. */
  Lr = 'LR',
  /** Libya. */
  Ly = 'LY',
  /** Liechtenstein. */
  Li = 'LI',
  /** Lithuania. */
  Lt = 'LT',
  /** Luxembourg. */
  Lu = 'LU',
  /** Macao SAR China. */
  Mo = 'MO',
  /** Madagascar. */
  Mg = 'MG',
  /** Malawi. */
  Mw = 'MW',
  /** Malaysia. */
  My = 'MY',
  /** Maldives. */
  Mv = 'MV',
  /** Mali. */
  Ml = 'ML',
  /** Malta. */
  Mt = 'MT',
  /** Martinique. */
  Mq = 'MQ',
  /** Mauritania. */
  Mr = 'MR',
  /** Mauritius. */
  Mu = 'MU',
  /** Mayotte. */
  Yt = 'YT',
  /** Mexico. */
  Mx = 'MX',
  /** Moldova. */
  Md = 'MD',
  /** Monaco. */
  Mc = 'MC',
  /** Mongolia. */
  Mn = 'MN',
  /** Montenegro. */
  Me = 'ME',
  /** Montserrat. */
  Ms = 'MS',
  /** Morocco. */
  Ma = 'MA',
  /** Mozambique. */
  Mz = 'MZ',
  /** Myanmar (Burma). */
  Mm = 'MM',
  /** Namibia. */
  Na = 'NA',
  /** Nauru. */
  Nr = 'NR',
  /** Nepal. */
  Np = 'NP',
  /** Netherlands. */
  Nl = 'NL',
  /** Netherlands Antilles. */
  An = 'AN',
  /** New Caledonia. */
  Nc = 'NC',
  /** New Zealand. */
  Nz = 'NZ',
  /** Nicaragua. */
  Ni = 'NI',
  /** Niger. */
  Ne = 'NE',
  /** Nigeria. */
  Ng = 'NG',
  /** Niue. */
  Nu = 'NU',
  /** Norfolk Island. */
  Nf = 'NF',
  /** North Macedonia. */
  Mk = 'MK',
  /** Norway. */
  No = 'NO',
  /** Oman. */
  Om = 'OM',
  /** Pakistan. */
  Pk = 'PK',
  /** Palestinian Territories. */
  Ps = 'PS',
  /** Panama. */
  Pa = 'PA',
  /** Papua New Guinea. */
  Pg = 'PG',
  /** Paraguay. */
  Py = 'PY',
  /** Peru. */
  Pe = 'PE',
  /** Philippines. */
  Ph = 'PH',
  /** Pitcairn Islands. */
  Pn = 'PN',
  /** Poland. */
  Pl = 'PL',
  /** Portugal. */
  Pt = 'PT',
  /** Qatar. */
  Qa = 'QA',
  /** Cameroon. */
  Cm = 'CM',
  /** Réunion. */
  Re = 'RE',
  /** Romania. */
  Ro = 'RO',
  /** Russia. */
  Ru = 'RU',
  /** Rwanda. */
  Rw = 'RW',
  /** St. Barthélemy. */
  Bl = 'BL',
  /** St. Helena. */
  Sh = 'SH',
  /** St. Kitts & Nevis. */
  Kn = 'KN',
  /** St. Lucia. */
  Lc = 'LC',
  /** St. Martin. */
  Mf = 'MF',
  /** St. Pierre & Miquelon. */
  Pm = 'PM',
  /** Samoa. */
  Ws = 'WS',
  /** San Marino. */
  Sm = 'SM',
  /** São Tomé & Príncipe. */
  St = 'ST',
  /** Saudi Arabia. */
  Sa = 'SA',
  /** Senegal. */
  Sn = 'SN',
  /** Serbia. */
  Rs = 'RS',
  /** Seychelles. */
  Sc = 'SC',
  /** Sierra Leone. */
  Sl = 'SL',
  /** Singapore. */
  Sg = 'SG',
  /** Sint Maarten. */
  Sx = 'SX',
  /** Slovakia. */
  Sk = 'SK',
  /** Slovenia. */
  Si = 'SI',
  /** Solomon Islands. */
  Sb = 'SB',
  /** Somalia. */
  So = 'SO',
  /** South Africa. */
  Za = 'ZA',
  /** South Georgia & South Sandwich Islands. */
  Gs = 'GS',
  /** South Korea. */
  Kr = 'KR',
  /** South Sudan. */
  Ss = 'SS',
  /** Spain. */
  Es = 'ES',
  /** Sri Lanka. */
  Lk = 'LK',
  /** St. Vincent & Grenadines. */
  Vc = 'VC',
  /** Sudan. */
  Sd = 'SD',
  /** Suriname. */
  Sr = 'SR',
  /** Svalbard & Jan Mayen. */
  Sj = 'SJ',
  /** Sweden. */
  Se = 'SE',
  /** Switzerland. */
  Ch = 'CH',
  /** Syria. */
  Sy = 'SY',
  /** Taiwan. */
  Tw = 'TW',
  /** Tajikistan. */
  Tj = 'TJ',
  /** Tanzania. */
  Tz = 'TZ',
  /** Thailand. */
  Th = 'TH',
  /** Timor-Leste. */
  Tl = 'TL',
  /** Togo. */
  Tg = 'TG',
  /** Tokelau. */
  Tk = 'TK',
  /** Tonga. */
  To = 'TO',
  /** Trinidad & Tobago. */
  Tt = 'TT',
  /** Tunisia. */
  Tn = 'TN',
  /** Turkey. */
  Tr = 'TR',
  /** Turkmenistan. */
  Tm = 'TM',
  /** Turks & Caicos Islands. */
  Tc = 'TC',
  /** Tuvalu. */
  Tv = 'TV',
  /** Uganda. */
  Ug = 'UG',
  /** Ukraine. */
  Ua = 'UA',
  /** United Arab Emirates. */
  Ae = 'AE',
  /** United Kingdom. */
  Gb = 'GB',
  /** United States. */
  Us = 'US',
  /** U.S. Outlying Islands. */
  Um = 'UM',
  /** Uruguay. */
  Uy = 'UY',
  /** Uzbekistan. */
  Uz = 'UZ',
  /** Vanuatu. */
  Vu = 'VU',
  /** Venezuela. */
  Ve = 'VE',
  /** Vietnam. */
  Vn = 'VN',
  /** British Virgin Islands. */
  Vg = 'VG',
  /** Wallis & Futuna. */
  Wf = 'WF',
  /** Western Sahara. */
  Eh = 'EH',
  /** Yemen. */
  Ye = 'YE',
  /** Zambia. */
  Zm = 'ZM',
  /** Zimbabwe. */
  Zw = 'ZW'
}

/** Credit card information used for a payment. */
export type ShopifyCreditCard = {
   __typename?: 'CreditCard';
  /** The brand of the credit card. */
  brand?: Maybe<Scalars['String']>;
  /** The expiry month of the credit card. */
  expiryMonth?: Maybe<Scalars['Int']>;
  /** The expiry year of the credit card. */
  expiryYear?: Maybe<Scalars['Int']>;
  /** The credit card's BIN number. */
  firstDigits?: Maybe<Scalars['String']>;
  /** The first name of the card holder. */
  firstName?: Maybe<Scalars['String']>;
  /** The last 4 digits of the credit card. */
  lastDigits?: Maybe<Scalars['String']>;
  /** The last name of the card holder. */
  lastName?: Maybe<Scalars['String']>;
  /** The masked credit card number with only the last 4 digits displayed. */
  maskedNumber?: Maybe<Scalars['String']>;
};

/**
 * Specifies the fields required to complete a checkout with
 * a Shopify vaulted credit card payment.
 */
export type ShopifyCreditCardPaymentInput = {
  /** The amount of the payment. */
  amount: Scalars['Money'];
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: Scalars['String'];
  /** The billing address for the payment. */
  billingAddress: ShopifyMailingAddressInput;
  /** The ID returned by Shopify's Card Vault. */
  vaultId: Scalars['String'];
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>;
};

/**
 * Specifies the fields required to complete a checkout with
 * a Shopify vaulted credit card payment.
 */
export type ShopifyCreditCardPaymentInputV2 = {
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyMoneyInput;
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: Scalars['String'];
  /** The billing address for the payment. */
  billingAddress: ShopifyMailingAddressInput;
  /** The ID returned by Shopify's Card Vault. */
  vaultId: Scalars['String'];
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>;
};

/** The part of the image that should remain after cropping. */
export enum ShopifyCropRegion {
  /** Keep the center of the image. */
  Center = 'CENTER',
  /** Keep the top of the image. */
  Top = 'TOP',
  /** Keep the bottom of the image. */
  Bottom = 'BOTTOM',
  /** Keep the left of the image. */
  Left = 'LEFT',
  /** Keep the right of the image. */
  Right = 'RIGHT'
}

/** Currency codes. */
export enum ShopifyCurrencyCode {
  /** United States Dollars (USD). */
  Usd = 'USD',
  /** Euro (EUR). */
  Eur = 'EUR',
  /** United Kingdom Pounds (GBP). */
  Gbp = 'GBP',
  /** Canadian Dollars (CAD). */
  Cad = 'CAD',
  /** Afghan Afghani (AFN). */
  Afn = 'AFN',
  /** Albanian Lek (ALL). */
  All = 'ALL',
  /** Algerian Dinar (DZD). */
  Dzd = 'DZD',
  /** Angolan Kwanza (AOA). */
  Aoa = 'AOA',
  /** Argentine Pesos (ARS). */
  Ars = 'ARS',
  /** Armenian Dram (AMD). */
  Amd = 'AMD',
  /** Aruban Florin (AWG). */
  Awg = 'AWG',
  /** Australian Dollars (AUD). */
  Aud = 'AUD',
  /** Barbadian Dollar (BBD). */
  Bbd = 'BBD',
  /** Azerbaijani Manat (AZN). */
  Azn = 'AZN',
  /** Bangladesh Taka (BDT). */
  Bdt = 'BDT',
  /** Bahamian Dollar (BSD). */
  Bsd = 'BSD',
  /** Bahraini Dinar (BHD). */
  Bhd = 'BHD',
  /** Burundian Franc (BIF). */
  Bif = 'BIF',
  /** Belarusian Ruble (BYR). */
  Byr = 'BYR',
  /** Belize Dollar (BZD). */
  Bzd = 'BZD',
  /** Bermudian Dollar (BMD). */
  Bmd = 'BMD',
  /** Bhutanese Ngultrum (BTN). */
  Btn = 'BTN',
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = 'BAM',
  /** Brazilian Real (BRL). */
  Brl = 'BRL',
  /** Bolivian Boliviano (BOB). */
  Bob = 'BOB',
  /** Botswana Pula (BWP). */
  Bwp = 'BWP',
  /** Brunei Dollar (BND). */
  Bnd = 'BND',
  /** Bulgarian Lev (BGN). */
  Bgn = 'BGN',
  /** Burmese Kyat (MMK). */
  Mmk = 'MMK',
  /** Cambodian Riel. */
  Khr = 'KHR',
  /** Cape Verdean escudo (CVE). */
  Cve = 'CVE',
  /** Cayman Dollars (KYD). */
  Kyd = 'KYD',
  /** Central African CFA Franc (XAF). */
  Xaf = 'XAF',
  /** Chilean Peso (CLP). */
  Clp = 'CLP',
  /** Chinese Yuan Renminbi (CNY). */
  Cny = 'CNY',
  /** Colombian Peso (COP). */
  Cop = 'COP',
  /** Comorian Franc (KMF). */
  Kmf = 'KMF',
  /** Congolese franc (CDF). */
  Cdf = 'CDF',
  /** Costa Rican Colones (CRC). */
  Crc = 'CRC',
  /** Croatian Kuna (HRK). */
  Hrk = 'HRK',
  /** Czech Koruny (CZK). */
  Czk = 'CZK',
  /** Danish Kroner (DKK). */
  Dkk = 'DKK',
  /** Djiboutian Franc (DJF). */
  Djf = 'DJF',
  /** Dominican Peso (DOP). */
  Dop = 'DOP',
  /** East Caribbean Dollar (XCD). */
  Xcd = 'XCD',
  /** Egyptian Pound (EGP). */
  Egp = 'EGP',
  /** Ethiopian Birr (ETB). */
  Etb = 'ETB',
  /** Falkland Islands Pounds (FKP). */
  Fkp = 'FKP',
  /** CFP Franc (XPF). */
  Xpf = 'XPF',
  /** Fijian Dollars (FJD). */
  Fjd = 'FJD',
  /** Gibraltar Pounds (GIP). */
  Gip = 'GIP',
  /** Gambian Dalasi (GMD). */
  Gmd = 'GMD',
  /** Ghanaian Cedi (GHS). */
  Ghs = 'GHS',
  /** Guatemalan Quetzal (GTQ). */
  Gtq = 'GTQ',
  /** Guyanese Dollar (GYD). */
  Gyd = 'GYD',
  /** Georgian Lari (GEL). */
  Gel = 'GEL',
  /** Guinean Franc (GNF). */
  Gnf = 'GNF',
  /** Haitian Gourde (HTG). */
  Htg = 'HTG',
  /** Honduran Lempira (HNL). */
  Hnl = 'HNL',
  /** Hong Kong Dollars (HKD). */
  Hkd = 'HKD',
  /** Hungarian Forint (HUF). */
  Huf = 'HUF',
  /** Icelandic Kronur (ISK). */
  Isk = 'ISK',
  /** Indian Rupees (INR). */
  Inr = 'INR',
  /** Indonesian Rupiah (IDR). */
  Idr = 'IDR',
  /** Israeli New Shekel (NIS). */
  Ils = 'ILS',
  /** Iranian Rial (IRR). */
  Irr = 'IRR',
  /** Iraqi Dinar (IQD). */
  Iqd = 'IQD',
  /** Jamaican Dollars (JMD). */
  Jmd = 'JMD',
  /** Japanese Yen (JPY). */
  Jpy = 'JPY',
  /** Jersey Pound. */
  Jep = 'JEP',
  /** Jordanian Dinar (JOD). */
  Jod = 'JOD',
  /** Kazakhstani Tenge (KZT). */
  Kzt = 'KZT',
  /** Kenyan Shilling (KES). */
  Kes = 'KES',
  /** Kuwaiti Dinar (KWD). */
  Kwd = 'KWD',
  /** Kyrgyzstani Som (KGS). */
  Kgs = 'KGS',
  /** Laotian Kip (LAK). */
  Lak = 'LAK',
  /** Latvian Lati (LVL). */
  Lvl = 'LVL',
  /** Lebanese Pounds (LBP). */
  Lbp = 'LBP',
  /** Lesotho Loti (LSL). */
  Lsl = 'LSL',
  /** Liberian Dollar (LRD). */
  Lrd = 'LRD',
  /** Libyan Dinar (LYD). */
  Lyd = 'LYD',
  /** Lithuanian Litai (LTL). */
  Ltl = 'LTL',
  /** Malagasy Ariary (MGA). */
  Mga = 'MGA',
  /** Macedonia Denar (MKD). */
  Mkd = 'MKD',
  /** Macanese Pataca (MOP). */
  Mop = 'MOP',
  /** Malawian Kwacha (MWK). */
  Mwk = 'MWK',
  /** Maldivian Rufiyaa (MVR). */
  Mvr = 'MVR',
  /** Mexican Pesos (MXN). */
  Mxn = 'MXN',
  /** Malaysian Ringgits (MYR). */
  Myr = 'MYR',
  /** Mauritian Rupee (MUR). */
  Mur = 'MUR',
  /** Moldovan Leu (MDL). */
  Mdl = 'MDL',
  /** Moroccan Dirham. */
  Mad = 'MAD',
  /** Mongolian Tugrik. */
  Mnt = 'MNT',
  /** Mozambican Metical. */
  Mzn = 'MZN',
  /** Namibian Dollar. */
  Nad = 'NAD',
  /** Nepalese Rupee (NPR). */
  Npr = 'NPR',
  /** Netherlands Antillean Guilder. */
  Ang = 'ANG',
  /** New Zealand Dollars (NZD). */
  Nzd = 'NZD',
  /** Nicaraguan Córdoba (NIO). */
  Nio = 'NIO',
  /** Nigerian Naira (NGN). */
  Ngn = 'NGN',
  /** Norwegian Kroner (NOK). */
  Nok = 'NOK',
  /** Omani Rial (OMR). */
  Omr = 'OMR',
  /** Panamian Balboa (PAB). */
  Pab = 'PAB',
  /** Pakistani Rupee (PKR). */
  Pkr = 'PKR',
  /** Papua New Guinean Kina (PGK). */
  Pgk = 'PGK',
  /** Paraguayan Guarani (PYG). */
  Pyg = 'PYG',
  /** Peruvian Nuevo Sol (PEN). */
  Pen = 'PEN',
  /** Philippine Peso (PHP). */
  Php = 'PHP',
  /** Polish Zlotych (PLN). */
  Pln = 'PLN',
  /** Qatari Rial (QAR). */
  Qar = 'QAR',
  /** Romanian Lei (RON). */
  Ron = 'RON',
  /** Russian Rubles (RUB). */
  Rub = 'RUB',
  /** Rwandan Franc (RWF). */
  Rwf = 'RWF',
  /** Samoan Tala (WST). */
  Wst = 'WST',
  /** Saint Helena Pounds (SHP). */
  Shp = 'SHP',
  /** Saudi Riyal (SAR). */
  Sar = 'SAR',
  /** Sao Tome And Principe Dobra (STD). */
  Std = 'STD',
  /** Serbian dinar (RSD). */
  Rsd = 'RSD',
  /** Seychellois Rupee (SCR). */
  Scr = 'SCR',
  /** Sierra Leonean Leone (SLL). */
  Sll = 'SLL',
  /** Singapore Dollars (SGD). */
  Sgd = 'SGD',
  /** Sudanese Pound (SDG). */
  Sdg = 'SDG',
  /** Syrian Pound (SYP). */
  Syp = 'SYP',
  /** South African Rand (ZAR). */
  Zar = 'ZAR',
  /** South Korean Won (KRW). */
  Krw = 'KRW',
  /** South Sudanese Pound (SSP). */
  Ssp = 'SSP',
  /** Solomon Islands Dollar (SBD). */
  Sbd = 'SBD',
  /** Sri Lankan Rupees (LKR). */
  Lkr = 'LKR',
  /** Surinamese Dollar (SRD). */
  Srd = 'SRD',
  /** Swazi Lilangeni (SZL). */
  Szl = 'SZL',
  /** Swedish Kronor (SEK). */
  Sek = 'SEK',
  /** Swiss Francs (CHF). */
  Chf = 'CHF',
  /** Taiwan Dollars (TWD). */
  Twd = 'TWD',
  /** Thai baht (THB). */
  Thb = 'THB',
  /** Tajikistani Somoni (TJS). */
  Tjs = 'TJS',
  /** Tanzanian Shilling (TZS). */
  Tzs = 'TZS',
  /** Tongan Pa'anga (TOP). */
  Top = 'TOP',
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = 'TTD',
  /** Tunisian Dinar (TND). */
  Tnd = 'TND',
  /** Turkish Lira (TRY). */
  Try = 'TRY',
  /** Turkmenistani Manat (TMT). */
  Tmt = 'TMT',
  /** Ugandan Shilling (UGX). */
  Ugx = 'UGX',
  /** Ukrainian Hryvnia (UAH). */
  Uah = 'UAH',
  /** United Arab Emirates Dirham (AED). */
  Aed = 'AED',
  /** Uruguayan Pesos (UYU). */
  Uyu = 'UYU',
  /** Uzbekistan som (UZS). */
  Uzs = 'UZS',
  /** Vanuatu Vatu (VUV). */
  Vuv = 'VUV',
  /** Venezuelan Bolivares (VEF). */
  Vef = 'VEF',
  /** Vietnamese đồng (VND). */
  Vnd = 'VND',
  /** West African CFA franc (XOF). */
  Xof = 'XOF',
  /** Yemeni Rial (YER). */
  Yer = 'YER',
  /** Zambian Kwacha (ZMW). */
  Zmw = 'ZMW'
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyCustomer = {
   __typename?: 'Customer';
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: Scalars['Boolean'];
  /** A list of addresses for the customer. */
  addresses: ShopifyMailingAddressConnection;
  /** The date and time when the customer was created. */
  createdAt: Scalars['DateTime'];
  /** The customer’s default address. */
  defaultAddress?: Maybe<ShopifyMailingAddress>;
  /** The customer’s name, email or phone number. */
  displayName: Scalars['String'];
  /** The customer’s email address. */
  email?: Maybe<Scalars['String']>;
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']>;
  /** A unique identifier for the customer. */
  id: Scalars['ID'];
  /** The customer's most recently updated, incomplete checkout. */
  lastIncompleteCheckout?: Maybe<ShopifyCheckout>;
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']>;
  /** The orders associated with the customer. */
  orders: ShopifyOrderConnection;
  /** The customer’s phone number. */
  phone?: Maybe<Scalars['String']>;
  /**
   * A comma separated list of tags that have been added to the customer.
   * Additional access scope required: unauthenticated_read_customer_tags.
   */
  tags: Array<Scalars['String']>;
  /** The date and time when the customer information was updated. */
  updatedAt: Scalars['DateTime'];
};


/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyCustomerAddressesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyCustomerOrdersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyOrderSortKeys>;
  query?: Maybe<Scalars['String']>;
};

/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export type ShopifyCustomerAccessToken = {
   __typename?: 'CustomerAccessToken';
  /** The customer’s access token. */
  accessToken: Scalars['String'];
  /** The date and time when the customer access token expires. */
  expiresAt: Scalars['DateTime'];
};

/** Specifies the input fields required to create a customer access token. */
export type ShopifyCustomerAccessTokenCreateInput = {
  /** The email associated to the customer. */
  email: Scalars['String'];
  /** The login password to be used by the customer. */
  password: Scalars['String'];
};

/** Return type for `customerAccessTokenCreate` mutation. */
export type ShopifyCustomerAccessTokenCreatePayload = {
   __typename?: 'CustomerAccessTokenCreatePayload';
  /** The newly created customer access token object. */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerAccessTokenCreateWithMultipass` mutation. */
export type ShopifyCustomerAccessTokenCreateWithMultipassPayload = {
   __typename?: 'CustomerAccessTokenCreateWithMultipassPayload';
  /** An access token object associated with the customer. */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
};

/** Return type for `customerAccessTokenDelete` mutation. */
export type ShopifyCustomerAccessTokenDeletePayload = {
   __typename?: 'CustomerAccessTokenDeletePayload';
  /** The destroyed access token. */
  deletedAccessToken?: Maybe<Scalars['String']>;
  /** ID of the destroyed customer access token. */
  deletedCustomerAccessTokenId?: Maybe<Scalars['String']>;
  /** List of errors that occurred executing the mutation. */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerAccessTokenRenew` mutation. */
export type ShopifyCustomerAccessTokenRenewPayload = {
   __typename?: 'CustomerAccessTokenRenewPayload';
  /** The renewed customer access token object. */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerActivateByUrl` mutation. */
export type ShopifyCustomerActivateByUrlPayload = {
   __typename?: 'CustomerActivateByUrlPayload';
  /** The customer that was activated. */
  customer?: Maybe<ShopifyCustomer>;
  /** A new customer access token for the customer. */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
};

/** Specifies the input fields required to activate a customer. */
export type ShopifyCustomerActivateInput = {
  /** The activation token required to activate the customer. */
  activationToken: Scalars['String'];
  /** New password that will be set during activation. */
  password: Scalars['String'];
};

/** Return type for `customerActivate` mutation. */
export type ShopifyCustomerActivatePayload = {
   __typename?: 'CustomerActivatePayload';
  /** The customer object. */
  customer?: Maybe<ShopifyCustomer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerAddressCreate` mutation. */
export type ShopifyCustomerAddressCreatePayload = {
   __typename?: 'CustomerAddressCreatePayload';
  /** The new customer address object. */
  customerAddress?: Maybe<ShopifyMailingAddress>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerAddressDelete` mutation. */
export type ShopifyCustomerAddressDeletePayload = {
   __typename?: 'CustomerAddressDeletePayload';
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /** ID of the deleted customer address. */
  deletedCustomerAddressId?: Maybe<Scalars['String']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerAddressUpdate` mutation. */
export type ShopifyCustomerAddressUpdatePayload = {
   __typename?: 'CustomerAddressUpdatePayload';
  /** The customer’s updated mailing address. */
  customerAddress?: Maybe<ShopifyMailingAddress>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Specifies the fields required to create a new customer. */
export type ShopifyCustomerCreateInput = {
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']>;
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']>;
  /** The customer’s email. */
  email: Scalars['String'];
  /**
   * A unique phone number for the customer.
   * 
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: Maybe<Scalars['String']>;
  /** The login password used by the customer. */
  password: Scalars['String'];
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: Maybe<Scalars['Boolean']>;
};

/** Return type for `customerCreate` mutation. */
export type ShopifyCustomerCreatePayload = {
   __typename?: 'CustomerCreatePayload';
  /** The created customer object. */
  customer?: Maybe<ShopifyCustomer>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerDefaultAddressUpdate` mutation. */
export type ShopifyCustomerDefaultAddressUpdatePayload = {
   __typename?: 'CustomerDefaultAddressUpdatePayload';
  /** The updated customer object. */
  customer?: Maybe<ShopifyCustomer>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Possible error codes that could be returned by CustomerUserError. */
export enum ShopifyCustomerErrorCode {
  /** Input value is blank. */
  Blank = 'BLANK',
  /** Input value is invalid. */
  Invalid = 'INVALID',
  /** Input value is already taken. */
  Taken = 'TAKEN',
  /** Input value is too long. */
  TooLong = 'TOO_LONG',
  /** Input value is too short. */
  TooShort = 'TOO_SHORT',
  /** Unidentified customer. */
  UnidentifiedCustomer = 'UNIDENTIFIED_CUSTOMER',
  /** Customer is disabled. */
  CustomerDisabled = 'CUSTOMER_DISABLED',
  /** Input password starts or ends with whitespace. */
  PasswordStartsOrEndsWithWhitespace = 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE',
  /** Input contains HTML tags. */
  ContainsHtmlTags = 'CONTAINS_HTML_TAGS',
  /** Input contains URL. */
  ContainsUrl = 'CONTAINS_URL',
  /** Invalid activation token. */
  TokenInvalid = 'TOKEN_INVALID',
  /** Customer already enabled. */
  AlreadyEnabled = 'ALREADY_ENABLED',
  /** Address does not exist. */
  NotFound = 'NOT_FOUND',
  /** Input email contains an invalid domain name. */
  BadDomain = 'BAD_DOMAIN',
  /** Multipass token is not valid. */
  InvalidMultipassRequest = 'INVALID_MULTIPASS_REQUEST'
}

/** Return type for `customerRecover` mutation. */
export type ShopifyCustomerRecoverPayload = {
   __typename?: 'CustomerRecoverPayload';
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Return type for `customerResetByUrl` mutation. */
export type ShopifyCustomerResetByUrlPayload = {
   __typename?: 'CustomerResetByUrlPayload';
  /** The customer object which was reset. */
  customer?: Maybe<ShopifyCustomer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Specifies the fields required to reset a customer’s password. */
export type ShopifyCustomerResetInput = {
  /** The reset token required to reset the customer’s password. */
  resetToken: Scalars['String'];
  /** New password that will be set as part of the reset password process. */
  password: Scalars['String'];
};

/** Return type for `customerReset` mutation. */
export type ShopifyCustomerResetPayload = {
   __typename?: 'CustomerResetPayload';
  /** The customer object which was reset. */
  customer?: Maybe<ShopifyCustomer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Specifies the fields required to update the Customer information. */
export type ShopifyCustomerUpdateInput = {
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']>;
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']>;
  /** The customer’s email. */
  email?: Maybe<Scalars['String']>;
  /**
   * A unique phone number for the customer.
   * 
   * Formatted using E.164 standard. For example, _+16135551111_. To remove the phone number, specify `null`.
   */
  phone?: Maybe<Scalars['String']>;
  /** The login password used by the customer. */
  password?: Maybe<Scalars['String']>;
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: Maybe<Scalars['Boolean']>;
};

/** Return type for `customerUpdate` mutation. */
export type ShopifyCustomerUpdatePayload = {
   __typename?: 'CustomerUpdatePayload';
  /** The updated customer object. */
  customer?: Maybe<ShopifyCustomer>;
  /**
   * The newly created customer access token. If the customer's password is updated, all previous access tokens
   * (including the one used to perform this mutation) become invalid, and a new token is generated.
   */
  customerAccessToken?: Maybe<ShopifyCustomerAccessToken>;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: Array<ShopifyCustomerUserError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use `customerUserErrors` instead
   */
  userErrors: Array<ShopifyUserError>;
};

/** Represents an error that happens during execution of a customer mutation. */
export type ShopifyCustomerUserError = ShopifyDisplayableError & {
   __typename?: 'CustomerUserError';
  /** Error code to uniquely identify the error. */
  code?: Maybe<ShopifyCustomerErrorCode>;
  /** Path to the input field which caused the error. */
  field?: Maybe<Array<Scalars['String']>>;
  /** The error message. */
  message: Scalars['String'];
};



/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export enum ShopifyDigitalWallet {
  /** Apple Pay. */
  ApplePay = 'APPLE_PAY',
  /** Android Pay. */
  AndroidPay = 'ANDROID_PAY',
  /** Google Pay. */
  GooglePay = 'GOOGLE_PAY',
  /** Shopify Pay. */
  ShopifyPay = 'SHOPIFY_PAY'
}

/** An amount discounting the line that has been allocated by a discount. */
export type ShopifyDiscountAllocation = {
   __typename?: 'DiscountAllocation';
  /** Amount of discount allocated. */
  allocatedAmount: ShopifyMoneyV2;
  /** The discount this allocated amount originated from. */
  discountApplication: ShopifyDiscountApplication;
};

/**
 * Discount applications capture the intentions of a discount source at
 * the time of application.
 */
export type ShopifyDiscountApplication = {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyDiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyDiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyDiscountApplicationTargetType;
  /** The value of the discount application. */
  value: ShopifyPricingValue;
};

/** The method by which the discount's value is allocated onto its entitled lines. */
export enum ShopifyDiscountApplicationAllocationMethod {
  /** The value is spread across all entitled lines. */
  Across = 'ACROSS',
  /** The value is applied onto every entitled line. */
  Each = 'EACH',
  /** The value is specifically applied onto a particular line. */
  One = 'ONE'
}

export type ShopifyDiscountApplicationConnection = {
   __typename?: 'DiscountApplicationConnection';
  /** A list of edges. */
  edges: Array<ShopifyDiscountApplicationEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyDiscountApplicationEdge = {
   __typename?: 'DiscountApplicationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of DiscountApplicationEdge. */
  node: ShopifyDiscountApplication;
};

/**
 * Which lines on the order that the discount is allocated over, of the type
 * defined by the Discount Application's target_type.
 */
export enum ShopifyDiscountApplicationTargetSelection {
  /** The discount is allocated onto all the lines. */
  All = 'ALL',
  /** The discount is allocated onto only the lines it is entitled for. */
  Entitled = 'ENTITLED',
  /** The discount is allocated onto explicitly chosen lines. */
  Explicit = 'EXPLICIT'
}

/** The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards. */
export enum ShopifyDiscountApplicationTargetType {
  /** The discount applies onto line items. */
  LineItem = 'LINE_ITEM',
  /** The discount applies onto shipping lines. */
  ShippingLine = 'SHIPPING_LINE'
}

/**
 * Discount code applications capture the intentions of a discount code at
 * the time that it is applied.
 */
export type ShopifyDiscountCodeApplication = ShopifyDiscountApplication & {
   __typename?: 'DiscountCodeApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyDiscountApplicationAllocationMethod;
  /** Specifies whether the discount code was applied successfully. */
  applicable: Scalars['Boolean'];
  /** The string identifying the discount code that was used at the time of application. */
  code: Scalars['String'];
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyDiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyDiscountApplicationTargetType;
  /** The value of the discount application. */
  value: ShopifyPricingValue;
};

/** Represents an error in the input of a mutation. */
export type ShopifyDisplayableError = {
  /** Path to the input field which caused the error. */
  field?: Maybe<Array<Scalars['String']>>;
  /** The error message. */
  message: Scalars['String'];
};

/** Represents a web address. */
export type ShopifyDomain = {
   __typename?: 'Domain';
  /** The host name of the domain (eg: `example.com`). */
  host: Scalars['String'];
  /** Whether SSL is enabled or not. */
  sslEnabled: Scalars['Boolean'];
  /** The URL of the domain (eg: `https://example.com`). */
  url: Scalars['URL'];
};

/** Represents a video hosted outside of Shopify. */
export type ShopifyExternalVideo = ShopifyNode & ShopifyMedia & {
   __typename?: 'ExternalVideo';
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>;
  /** The URL. */
  embeddedUrl: Scalars['URL'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The media content type. */
  mediaContentType: ShopifyMediaContentType;
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyImage>;
};

/** Represents a single fulfillment in an order. */
export type ShopifyFulfillment = {
   __typename?: 'Fulfillment';
  /** List of the fulfillment's line items. */
  fulfillmentLineItems: ShopifyFulfillmentLineItemConnection;
  /** The name of the tracking company. */
  trackingCompany?: Maybe<Scalars['String']>;
  /**
   * Tracking information associated with the fulfillment,
   * such as the tracking number and tracking URL.
   */
  trackingInfo: Array<ShopifyFulfillmentTrackingInfo>;
};


/** Represents a single fulfillment in an order. */
export type ShopifyFulfillmentFulfillmentLineItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** Represents a single fulfillment in an order. */
export type ShopifyFulfillmentTrackingInfoArgs = {
  first?: Maybe<Scalars['Int']>;
};

/** Represents a single line item in a fulfillment. There is at most one fulfillment line item for each order line item. */
export type ShopifyFulfillmentLineItem = {
   __typename?: 'FulfillmentLineItem';
  /** The associated order's line item. */
  lineItem: ShopifyOrderLineItem;
  /** The amount fulfilled in this fulfillment. */
  quantity: Scalars['Int'];
};

export type ShopifyFulfillmentLineItemConnection = {
   __typename?: 'FulfillmentLineItemConnection';
  /** A list of edges. */
  edges: Array<ShopifyFulfillmentLineItemEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyFulfillmentLineItemEdge = {
   __typename?: 'FulfillmentLineItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of FulfillmentLineItemEdge. */
  node: ShopifyFulfillmentLineItem;
};

/** Tracking information associated with the fulfillment. */
export type ShopifyFulfillmentTrackingInfo = {
   __typename?: 'FulfillmentTrackingInfo';
  /** The tracking number of the fulfillment. */
  number?: Maybe<Scalars['String']>;
  /** The URL to track the fulfillment. */
  url?: Maybe<Scalars['URL']>;
};


/** Represents information about the metafields associated to the specified resource. */
export type ShopifyHasMetafields = {
  /** The metafield associated with the resource. */
  metafield?: Maybe<ShopifyMetafield>;
  /** A paginated list of metafields associated with the resource. */
  metafields: ShopifyMetafieldConnection;
};


/** Represents information about the metafields associated to the specified resource. */
export type ShopifyHasMetafieldsMetafieldArgs = {
  namespace: Scalars['String'];
  key: Scalars['String'];
};


/** Represents information about the metafields associated to the specified resource. */
export type ShopifyHasMetafieldsMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};

/** Represents an image resource. */
export type ShopifyImage = {
   __typename?: 'Image';
  /** A word or phrase to share the nature or contents of an image. */
  altText?: Maybe<Scalars['String']>;
  /** A unique identifier for the image. */
  id?: Maybe<Scalars['ID']>;
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: Scalars['URL'];
  /**
   * The location of the image as a URL.
   * @deprecated Previously an image had a single `src` field. This could either return the original image
   * location or a URL that contained transformations such as sizing or scale.
   * 
   * These transformations were specified by arguments on the parent field.
   * 
   * Now an image has two distinct URL fields: `originalSrc` and `transformedSrc`.
   * 
   * * `originalSrc` - the original unmodified image URL
   * * `transformedSrc` - the image URL with the specified transformations included
   * 
   * To migrate to the new fields, image transformations should be moved from the parent field to `transformedSrc`.
   * 
   * Before:
   * ```graphql
   * {
   *   shop {
   *     productImages(maxWidth: 200, scale: 2) {
   *       edges {
   *         node {
   *           src
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   * 
   * After:
   * ```graphql
   * {
   *   shop {
   *     productImages {
   *       edges {
   *         node {
   *           transformedSrc(maxWidth: 200, scale: 2)
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   * 
   */
  src: Scalars['URL'];
  /**
   * The location of the transformed image as a URL.
   * 
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type does not support will be ignored.
   */
  transformedSrc: Scalars['URL'];
};


/** Represents an image resource. */
export type ShopifyImageTransformedSrcArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  crop?: Maybe<ShopifyCropRegion>;
  scale?: Maybe<Scalars['Int']>;
  preferredContentType?: Maybe<ShopifyImageContentType>;
};

export type ShopifyImageConnection = {
   __typename?: 'ImageConnection';
  /** A list of edges. */
  edges: Array<ShopifyImageEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

/** List of supported image content types. */
export enum ShopifyImageContentType {
  /** A PNG image. */
  Png = 'PNG',
  /** A JPG image. */
  Jpg = 'JPG',
  /** A WEBP image. */
  Webp = 'WEBP'
}

export type ShopifyImageEdge = {
   __typename?: 'ImageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of ImageEdge. */
  node: ShopifyImage;
};

/** Represents a mailing address for customers and shipping. */
export type ShopifyMailingAddress = ShopifyNode & {
   __typename?: 'MailingAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']>;
  /**
   * The two-letter code for the country of the address.
   * 
   * For example, US.
   * @deprecated Use `countryCodeV2` instead
   */
  countryCode?: Maybe<Scalars['String']>;
  /**
   * The two-letter code for the country of the address.
   * 
   * For example, US.
   */
  countryCodeV2?: Maybe<ShopifyCountryCode>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']>;
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<Scalars['String']>;
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea?: Maybe<Scalars['String']>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']>;
  /** The latitude coordinate of the customer address. */
  latitude?: Maybe<Scalars['Float']>;
  /** The longitude coordinate of the customer address. */
  longitude?: Maybe<Scalars['Float']>;
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']>;
  /**
   * A unique phone number for the customer.
   * 
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: Maybe<Scalars['String']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']>;
  /**
   * The two-letter code for the region.
   * 
   * For example, ON.
   */
  provinceCode?: Maybe<Scalars['String']>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']>;
};


/** Represents a mailing address for customers and shipping. */
export type ShopifyMailingAddressFormattedArgs = {
  withName?: Maybe<Scalars['Boolean']>;
  withCompany?: Maybe<Scalars['Boolean']>;
};

export type ShopifyMailingAddressConnection = {
   __typename?: 'MailingAddressConnection';
  /** A list of edges. */
  edges: Array<ShopifyMailingAddressEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyMailingAddressEdge = {
   __typename?: 'MailingAddressEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of MailingAddressEdge. */
  node: ShopifyMailingAddress;
};

/** Specifies the fields accepted to create or update a mailing address. */
export type ShopifyMailingAddressInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']>;
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']>;
  /**
   * A unique phone number for the customer.
   * 
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: Maybe<Scalars['String']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']>;
};

/** Manual discount applications capture the intentions of a discount that was manually created. */
export type ShopifyManualDiscountApplication = ShopifyDiscountApplication & {
   __typename?: 'ManualDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyDiscountApplicationAllocationMethod;
  /** The description of the application. */
  description?: Maybe<Scalars['String']>;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyDiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyDiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars['String'];
  /** The value of the discount application. */
  value: ShopifyPricingValue;
};

/** Represents a media interface. */
export type ShopifyMedia = {
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>;
  /** The media content type. */
  mediaContentType: ShopifyMediaContentType;
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyImage>;
};

export type ShopifyMediaConnection = {
   __typename?: 'MediaConnection';
  /** A list of edges. */
  edges: Array<ShopifyMediaEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

/** The possible content types for a media object. */
export enum ShopifyMediaContentType {
  /** An externally hosted video. */
  ExternalVideo = 'EXTERNAL_VIDEO',
  /** A Shopify hosted image. */
  Image = 'IMAGE',
  /** A 3d model. */
  Model_3D = 'MODEL_3D',
  /** A Shopify hosted video. */
  Video = 'VIDEO'
}

export type ShopifyMediaEdge = {
   __typename?: 'MediaEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of MediaEdge. */
  node: ShopifyMedia;
};

/** Represents a Shopify hosted image. */
export type ShopifyMediaImage = ShopifyNode & ShopifyMedia & {
   __typename?: 'MediaImage';
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The image for the media. */
  image?: Maybe<ShopifyImage>;
  /** The media content type. */
  mediaContentType: ShopifyMediaContentType;
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyImage>;
};

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 */
export type ShopifyMetafield = ShopifyNode & {
   __typename?: 'Metafield';
  /** The date and time when the storefront metafield was created. */
  createdAt: Scalars['DateTime'];
  /** The description of a metafield. */
  description?: Maybe<Scalars['String']>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The key name for a metafield. */
  key: Scalars['String'];
  /** The namespace for a metafield. */
  namespace: Scalars['String'];
  /** The parent object that the metafield belongs to. */
  parentResource: ShopifyMetafieldParentResource;
  /** The date and time when the storefront metafield was updated. */
  updatedAt: Scalars['DateTime'];
  /** The value of a metafield. */
  value: Scalars['String'];
  /** Represents the metafield value type. */
  valueType: ShopifyMetafieldValueType;
};

export type ShopifyMetafieldConnection = {
   __typename?: 'MetafieldConnection';
  /** A list of edges. */
  edges: Array<ShopifyMetafieldEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyMetafieldEdge = {
   __typename?: 'MetafieldEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of MetafieldEdge. */
  node: ShopifyMetafield;
};

/** A resource that the metafield belongs to. */
export type ShopifyMetafieldParentResource = ShopifyProduct | ShopifyProductVariant;

/** Metafield value types. */
export enum ShopifyMetafieldValueType {
  /** A string metafield. */
  String = 'STRING',
  /** An integer metafield. */
  Integer = 'INTEGER',
  /** A json string metafield. */
  JsonString = 'JSON_STRING'
}

/** Represents a Shopify hosted 3D model. */
export type ShopifyModel3d = ShopifyNode & ShopifyMedia & {
   __typename?: 'Model3d';
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The media content type. */
  mediaContentType: ShopifyMediaContentType;
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyImage>;
  /** The sources for a 3d model. */
  sources: Array<ShopifyModel3dSource>;
};

/** Represents a source for a Shopify hosted 3d model. */
export type ShopifyModel3dSource = {
   __typename?: 'Model3dSource';
  /** The filesize of the 3d model. */
  filesize: Scalars['Int'];
  /** The format of the 3d model. */
  format: Scalars['String'];
  /** The MIME type of the 3d model. */
  mimeType: Scalars['String'];
  /** The URL of the 3d model. */
  url: Scalars['String'];
};


/** Specifies the fields for a monetary value with currency. */
export type ShopifyMoneyInput = {
  /** Decimal money amount. */
  amount: Scalars['Decimal'];
  /** Currency of the money. */
  currencyCode: ShopifyCurrencyCode;
};

/**
 * A monetary value with currency.
 * 
 * To format currencies, combine this type's amount and currencyCode fields with your client's locale.
 * 
 * For example, in JavaScript you could use Intl.NumberFormat:
 * 
 * ```js
 * new Intl.NumberFormat(locale, {
 *   style: 'currency',
 *   currency: currencyCode
 * }).format(amount);
 * ```
 * 
 * Other formatting libraries include:
 * 
 * * iOS - [NumberFormatter](https://developer.apple.com/documentation/foundation/numberformatter)
 * * Android - [NumberFormat](https://developer.android.com/reference/java/text/NumberFormat.html)
 * * PHP - [NumberFormatter](http://php.net/manual/en/class.numberformatter.php)
 * 
 * For a more general solution, the [Unicode CLDR number formatting database] is available with many implementations
 * (such as [TwitterCldr](https://github.com/twitter/twitter-cldr-rb)).
 */
export type ShopifyMoneyV2 = {
   __typename?: 'MoneyV2';
  /** Decimal money amount. */
  amount: Scalars['Decimal'];
  /** Currency of the money. */
  currencyCode: ShopifyCurrencyCode;
};

export type ShopifyMoneyV2Connection = {
   __typename?: 'MoneyV2Connection';
  /** A list of edges. */
  edges: Array<ShopifyMoneyV2Edge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyMoneyV2Edge = {
   __typename?: 'MoneyV2Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of MoneyV2Edge. */
  node: ShopifyMoneyV2;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutation = {
   __typename?: 'Mutation';
  /**
   * Updates the attributes of a checkout.
   * @deprecated Use `checkoutAttributesUpdateV2` instead
   */
  checkoutAttributesUpdate?: Maybe<ShopifyCheckoutAttributesUpdatePayload>;
  /** Updates the attributes of a checkout. */
  checkoutAttributesUpdateV2?: Maybe<ShopifyCheckoutAttributesUpdateV2Payload>;
  /** Completes a checkout without providing payment information. You can use this mutation for free items or items whose purchase price is covered by a gift card. */
  checkoutCompleteFree?: Maybe<ShopifyCheckoutCompleteFreePayload>;
  /**
   * Completes a checkout using a credit card token from Shopify's Vault.
   * @deprecated Use `checkoutCompleteWithCreditCardV2` instead
   */
  checkoutCompleteWithCreditCard?: Maybe<ShopifyCheckoutCompleteWithCreditCardPayload>;
  /** Completes a checkout using a credit card token from Shopify's card vault. Before you can complete checkouts using CheckoutCompleteWithCreditCardV2, you need to  [_request payment processing_](https://help.shopify.com/api/guides/sales-channel-sdk/getting-started#request-payment-processing). */
  checkoutCompleteWithCreditCardV2?: Maybe<ShopifyCheckoutCompleteWithCreditCardV2Payload>;
  /**
   * Completes a checkout with a tokenized payment.
   * @deprecated Use `checkoutCompleteWithTokenizedPaymentV2` instead
   */
  checkoutCompleteWithTokenizedPayment?: Maybe<ShopifyCheckoutCompleteWithTokenizedPaymentPayload>;
  /**
   * Completes a checkout with a tokenized payment.
   * @deprecated Use `checkoutCompleteWithTokenizedPaymentV3` instead
   */
  checkoutCompleteWithTokenizedPaymentV2?: Maybe<ShopifyCheckoutCompleteWithTokenizedPaymentV2Payload>;
  /** Completes a checkout with a tokenized payment. */
  checkoutCompleteWithTokenizedPaymentV3?: Maybe<ShopifyCheckoutCompleteWithTokenizedPaymentV3Payload>;
  /** Creates a new checkout. */
  checkoutCreate?: Maybe<ShopifyCheckoutCreatePayload>;
  /**
   * Associates a customer to the checkout.
   * @deprecated Use `checkoutCustomerAssociateV2` instead
   */
  checkoutCustomerAssociate?: Maybe<ShopifyCheckoutCustomerAssociatePayload>;
  /** Associates a customer to the checkout. */
  checkoutCustomerAssociateV2?: Maybe<ShopifyCheckoutCustomerAssociateV2Payload>;
  /**
   * Disassociates the current checkout customer from the checkout.
   * @deprecated Use `checkoutCustomerDisassociateV2` instead
   */
  checkoutCustomerDisassociate?: Maybe<ShopifyCheckoutCustomerDisassociatePayload>;
  /** Disassociates the current checkout customer from the checkout. */
  checkoutCustomerDisassociateV2?: Maybe<ShopifyCheckoutCustomerDisassociateV2Payload>;
  /**
   * Applies a discount to an existing checkout using a discount code.
   * @deprecated Use `checkoutDiscountCodeApplyV2` instead
   */
  checkoutDiscountCodeApply?: Maybe<ShopifyCheckoutDiscountCodeApplyPayload>;
  /** Applies a discount to an existing checkout using a discount code. */
  checkoutDiscountCodeApplyV2?: Maybe<ShopifyCheckoutDiscountCodeApplyV2Payload>;
  /** Removes the applied discount from an existing checkout. */
  checkoutDiscountCodeRemove?: Maybe<ShopifyCheckoutDiscountCodeRemovePayload>;
  /**
   * Updates the email on an existing checkout.
   * @deprecated Use `checkoutEmailUpdateV2` instead
   */
  checkoutEmailUpdate?: Maybe<ShopifyCheckoutEmailUpdatePayload>;
  /** Updates the email on an existing checkout. */
  checkoutEmailUpdateV2?: Maybe<ShopifyCheckoutEmailUpdateV2Payload>;
  /**
   * Applies a gift card to an existing checkout using a gift card code. This will replace all currently applied gift cards.
   * @deprecated Use `checkoutGiftCardsAppend` instead
   */
  checkoutGiftCardApply?: Maybe<ShopifyCheckoutGiftCardApplyPayload>;
  /**
   * Removes an applied gift card from the checkout.
   * @deprecated Use `checkoutGiftCardRemoveV2` instead
   */
  checkoutGiftCardRemove?: Maybe<ShopifyCheckoutGiftCardRemovePayload>;
  /** Removes an applied gift card from the checkout. */
  checkoutGiftCardRemoveV2?: Maybe<ShopifyCheckoutGiftCardRemoveV2Payload>;
  /** Appends gift cards to an existing checkout. */
  checkoutGiftCardsAppend?: Maybe<ShopifyCheckoutGiftCardsAppendPayload>;
  /** Adds a list of line items to a checkout. */
  checkoutLineItemsAdd?: Maybe<ShopifyCheckoutLineItemsAddPayload>;
  /** Removes line items from an existing checkout. */
  checkoutLineItemsRemove?: Maybe<ShopifyCheckoutLineItemsRemovePayload>;
  /** Sets a list of line items to a checkout. */
  checkoutLineItemsReplace?: Maybe<ShopifyCheckoutLineItemsReplacePayload>;
  /** Updates line items on a checkout. */
  checkoutLineItemsUpdate?: Maybe<ShopifyCheckoutLineItemsUpdatePayload>;
  /**
   * Updates the shipping address of an existing checkout.
   * @deprecated Use `checkoutShippingAddressUpdateV2` instead
   */
  checkoutShippingAddressUpdate?: Maybe<ShopifyCheckoutShippingAddressUpdatePayload>;
  /** Updates the shipping address of an existing checkout. */
  checkoutShippingAddressUpdateV2?: Maybe<ShopifyCheckoutShippingAddressUpdateV2Payload>;
  /** Updates the shipping lines on an existing checkout. */
  checkoutShippingLineUpdate?: Maybe<ShopifyCheckoutShippingLineUpdatePayload>;
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   */
  customerAccessTokenCreate?: Maybe<ShopifyCustomerAccessTokenCreatePayload>;
  /**
   * Creates a customer access token using a multipass token instead of email and password.
   * A customer record is created if customer does not exist. If a customer record already
   * exists but the record is disabled, then it's enabled.
   */
  customerAccessTokenCreateWithMultipass?: Maybe<ShopifyCustomerAccessTokenCreateWithMultipassPayload>;
  /** Permanently destroys a customer access token. */
  customerAccessTokenDelete?: Maybe<ShopifyCustomerAccessTokenDeletePayload>;
  /**
   * Renews a customer access token.
   * 
   * Access token renewal must happen *before* a token expires.
   * If a token has already expired, a new one should be created instead via `customerAccessTokenCreate`.
   */
  customerAccessTokenRenew?: Maybe<ShopifyCustomerAccessTokenRenewPayload>;
  /** Activates a customer. */
  customerActivate?: Maybe<ShopifyCustomerActivatePayload>;
  /** Activates a customer with the activation url received from `customerCreate`. */
  customerActivateByUrl?: Maybe<ShopifyCustomerActivateByUrlPayload>;
  /** Creates a new address for a customer. */
  customerAddressCreate?: Maybe<ShopifyCustomerAddressCreatePayload>;
  /** Permanently deletes the address of an existing customer. */
  customerAddressDelete?: Maybe<ShopifyCustomerAddressDeletePayload>;
  /** Updates the address of an existing customer. */
  customerAddressUpdate?: Maybe<ShopifyCustomerAddressUpdatePayload>;
  /** Creates a new customer. */
  customerCreate?: Maybe<ShopifyCustomerCreatePayload>;
  /** Updates the default address of an existing customer. */
  customerDefaultAddressUpdate?: Maybe<ShopifyCustomerDefaultAddressUpdatePayload>;
  /** Sends a reset password email to the customer, as the first step in the reset password process. */
  customerRecover?: Maybe<ShopifyCustomerRecoverPayload>;
  /** Resets a customer’s password with a token received from `CustomerRecover`. */
  customerReset?: Maybe<ShopifyCustomerResetPayload>;
  /** Resets a customer’s password with the reset password url received from `CustomerRecover`. */
  customerResetByUrl?: Maybe<ShopifyCustomerResetByUrlPayload>;
  /** Updates an existing customer. */
  customerUpdate?: Maybe<ShopifyCustomerUpdatePayload>;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutAttributesUpdateArgs = {
  checkoutId: Scalars['ID'];
  input: ShopifyCheckoutAttributesUpdateInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutAttributesUpdateV2Args = {
  checkoutId: Scalars['ID'];
  input: ShopifyCheckoutAttributesUpdateV2Input;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCompleteFreeArgs = {
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCompleteWithCreditCardArgs = {
  checkoutId: Scalars['ID'];
  payment: ShopifyCreditCardPaymentInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCompleteWithCreditCardV2Args = {
  checkoutId: Scalars['ID'];
  payment: ShopifyCreditCardPaymentInputV2;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCompleteWithTokenizedPaymentArgs = {
  checkoutId: Scalars['ID'];
  payment: ShopifyTokenizedPaymentInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCompleteWithTokenizedPaymentV2Args = {
  checkoutId: Scalars['ID'];
  payment: ShopifyTokenizedPaymentInputV2;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCompleteWithTokenizedPaymentV3Args = {
  checkoutId: Scalars['ID'];
  payment: ShopifyTokenizedPaymentInputV3;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCreateArgs = {
  input: ShopifyCheckoutCreateInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCustomerAssociateArgs = {
  checkoutId: Scalars['ID'];
  customerAccessToken: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCustomerAssociateV2Args = {
  checkoutId: Scalars['ID'];
  customerAccessToken: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCustomerDisassociateArgs = {
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutCustomerDisassociateV2Args = {
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutDiscountCodeApplyArgs = {
  discountCode: Scalars['String'];
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutDiscountCodeApplyV2Args = {
  discountCode: Scalars['String'];
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutDiscountCodeRemoveArgs = {
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutEmailUpdateArgs = {
  checkoutId: Scalars['ID'];
  email: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutEmailUpdateV2Args = {
  checkoutId: Scalars['ID'];
  email: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutGiftCardApplyArgs = {
  giftCardCode: Scalars['String'];
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutGiftCardRemoveArgs = {
  appliedGiftCardId: Scalars['ID'];
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutGiftCardRemoveV2Args = {
  appliedGiftCardId: Scalars['ID'];
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutGiftCardsAppendArgs = {
  giftCardCodes: Array<Scalars['String']>;
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutLineItemsAddArgs = {
  lineItems: Array<ShopifyCheckoutLineItemInput>;
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutLineItemsRemoveArgs = {
  checkoutId: Scalars['ID'];
  lineItemIds: Array<Scalars['ID']>;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutLineItemsReplaceArgs = {
  lineItems: Array<ShopifyCheckoutLineItemInput>;
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutLineItemsUpdateArgs = {
  checkoutId: Scalars['ID'];
  lineItems: Array<ShopifyCheckoutLineItemUpdateInput>;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutShippingAddressUpdateArgs = {
  shippingAddress: ShopifyMailingAddressInput;
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutShippingAddressUpdateV2Args = {
  shippingAddress: ShopifyMailingAddressInput;
  checkoutId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCheckoutShippingLineUpdateArgs = {
  checkoutId: Scalars['ID'];
  shippingRateHandle: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerAccessTokenCreateArgs = {
  input: ShopifyCustomerAccessTokenCreateInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerAccessTokenCreateWithMultipassArgs = {
  multipassToken: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerAccessTokenDeleteArgs = {
  customerAccessToken: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerAccessTokenRenewArgs = {
  customerAccessToken: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerActivateArgs = {
  id: Scalars['ID'];
  input: ShopifyCustomerActivateInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerActivateByUrlArgs = {
  activationUrl: Scalars['URL'];
  password: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerAddressCreateArgs = {
  customerAccessToken: Scalars['String'];
  address: ShopifyMailingAddressInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerAddressDeleteArgs = {
  id: Scalars['ID'];
  customerAccessToken: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerAddressUpdateArgs = {
  customerAccessToken: Scalars['String'];
  id: Scalars['ID'];
  address: ShopifyMailingAddressInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerCreateArgs = {
  input: ShopifyCustomerCreateInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerDefaultAddressUpdateArgs = {
  customerAccessToken: Scalars['String'];
  addressId: Scalars['ID'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerRecoverArgs = {
  email: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerResetArgs = {
  id: Scalars['ID'];
  input: ShopifyCustomerResetInput;
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerResetByUrlArgs = {
  resetUrl: Scalars['URL'];
  password: Scalars['String'];
};


/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyMutationCustomerUpdateArgs = {
  customerAccessToken: Scalars['String'];
  customer: ShopifyCustomerUpdateInput;
};

/** An object with an ID to support global identification. */
export type ShopifyNode = {
  /** Globally unique identifier. */
  id: Scalars['ID'];
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyOrder = ShopifyNode & {
   __typename?: 'Order';
  /** Represents the reason for the order's cancellation. Returns null if the order wasn't canceled. */
  cancelReason?: Maybe<ShopifyOrderCancelReason>;
  /** The date and time when the order was canceled. Returns null if the order wasn't canceled. */
  canceledAt?: Maybe<Scalars['DateTime']>;
  /** The code of the currency used for the payment. */
  currencyCode: ShopifyCurrencyCode;
  /** The subtotal of line items and their discounts, excluding line items that have been removed. Does not contain order-level discounts, duties, shipping costs, or shipping discounts. Taxes are not included unless the order is a taxes-included order. */
  currentSubtotalPrice: ShopifyMoneyV2;
  /** The total amount of the order, including duties, taxes and discounts, minus amounts for line items that have been removed. */
  currentTotalPrice: ShopifyMoneyV2;
  /** The total of all taxes applied to the order, excluding taxes for returned line items. */
  currentTotalTax: ShopifyMoneyV2;
  /** The locale code in which this specific order happened. */
  customerLocale?: Maybe<Scalars['String']>;
  /** The unique URL that the customer can use to access the order. */
  customerUrl?: Maybe<Scalars['URL']>;
  /** Discounts that have been applied on the order. */
  discountApplications: ShopifyDiscountApplicationConnection;
  /** Whether the order has had any edits applied or not. */
  edited: Scalars['Boolean'];
  /** The customer's email address. */
  email?: Maybe<Scalars['String']>;
  /** The financial status of the order. */
  financialStatus?: Maybe<ShopifyOrderFinancialStatus>;
  /** The fulfillment status for the order. */
  fulfillmentStatus: ShopifyOrderFulfillmentStatus;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** List of the order’s line items. */
  lineItems: ShopifyOrderLineItemConnection;
  /**
   * Unique identifier for the order that appears on the order.
   * For example, _#1000_ or _Store1001.
   */
  name: Scalars['String'];
  /** A unique numeric identifier for the order for use by shop owner and customer. */
  orderNumber: Scalars['Int'];
  /** The total price of the order before any applied edits. */
  originalTotalPrice: ShopifyMoneyV2;
  /** The customer's phone number for receiving SMS notifications. */
  phone?: Maybe<Scalars['String']>;
  /**
   * The date and time when the order was imported.
   * This value can be set to dates in the past when importing from other systems.
   * If no value is provided, it will be auto-generated based on current date and time.
   */
  processedAt: Scalars['DateTime'];
  /** The address to where the order will be shipped. */
  shippingAddress?: Maybe<ShopifyMailingAddress>;
  /** The discounts that have been allocated onto the shipping line by discount applications. */
  shippingDiscountAllocations: Array<ShopifyDiscountAllocation>;
  /** The unique URL for the order's status page. */
  statusUrl: Scalars['URL'];
  /**
   * Price of the order before shipping and taxes.
   * @deprecated Use `subtotalPriceV2` instead
   */
  subtotalPrice?: Maybe<Scalars['Money']>;
  /** Price of the order before duties, shipping and taxes. */
  subtotalPriceV2?: Maybe<ShopifyMoneyV2>;
  /** List of the order’s successful fulfillments. */
  successfulFulfillments?: Maybe<Array<ShopifyFulfillment>>;
  /**
   * The sum of all the prices of all the items in the order, taxes and discounts included (must be positive).
   * @deprecated Use `totalPriceV2` instead
   */
  totalPrice: Scalars['Money'];
  /** The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive). */
  totalPriceV2: ShopifyMoneyV2;
  /**
   * The total amount that has been refunded.
   * @deprecated Use `totalRefundedV2` instead
   */
  totalRefunded: Scalars['Money'];
  /** The total amount that has been refunded. */
  totalRefundedV2: ShopifyMoneyV2;
  /**
   * The total cost of shipping.
   * @deprecated Use `totalShippingPriceV2` instead
   */
  totalShippingPrice: Scalars['Money'];
  /** The total cost of shipping. */
  totalShippingPriceV2: ShopifyMoneyV2;
  /**
   * The total cost of taxes.
   * @deprecated Use `totalTaxV2` instead
   */
  totalTax?: Maybe<Scalars['Money']>;
  /** The total cost of taxes. */
  totalTaxV2?: Maybe<ShopifyMoneyV2>;
};


/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyOrderDiscountApplicationsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyOrderLineItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyOrderSuccessfulFulfillmentsArgs = {
  first?: Maybe<Scalars['Int']>;
};

/** Represents the reason for the order's cancellation. */
export enum ShopifyOrderCancelReason {
  /** The customer wanted to cancel the order. */
  Customer = 'CUSTOMER',
  /** The order was fraudulent. */
  Fraud = 'FRAUD',
  /** There was insufficient inventory. */
  Inventory = 'INVENTORY',
  /** Payment was declined. */
  Declined = 'DECLINED',
  /** The order was canceled for an unlisted reason. */
  Other = 'OTHER'
}

export type ShopifyOrderConnection = {
   __typename?: 'OrderConnection';
  /** A list of edges. */
  edges: Array<ShopifyOrderEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyOrderEdge = {
   __typename?: 'OrderEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of OrderEdge. */
  node: ShopifyOrder;
};

/** Represents the order's current financial status. */
export enum ShopifyOrderFinancialStatus {
  /** Displayed as **Pending**. */
  Pending = 'PENDING',
  /** Displayed as **Authorized**. */
  Authorized = 'AUTHORIZED',
  /** Displayed as **Partially paid**. */
  PartiallyPaid = 'PARTIALLY_PAID',
  /** Displayed as **Partially refunded**. */
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  /** Displayed as **Voided**. */
  Voided = 'VOIDED',
  /** Displayed as **Paid**. */
  Paid = 'PAID',
  /** Displayed as **Refunded**. */
  Refunded = 'REFUNDED'
}

/** Represents the order's current fulfillment status. */
export enum ShopifyOrderFulfillmentStatus {
  /** Displayed as **Unfulfilled**. */
  Unfulfilled = 'UNFULFILLED',
  /** Displayed as **Partially fulfilled**. */
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  /** Displayed as **Fulfilled**. */
  Fulfilled = 'FULFILLED',
  /** Displayed as **Restocked**. */
  Restocked = 'RESTOCKED',
  /** Displayed as **Pending fulfillment**. */
  PendingFulfillment = 'PENDING_FULFILLMENT',
  /** Displayed as **Open**. */
  Open = 'OPEN',
  /** Displayed as **In progress**. */
  InProgress = 'IN_PROGRESS'
}

/** Represents a single line in an order. There is one line item for each distinct product variant. */
export type ShopifyOrderLineItem = {
   __typename?: 'OrderLineItem';
  /** The number of entries associated to the line item minus the items that have been removed. */
  currentQuantity: Scalars['Int'];
  /** List of custom attributes associated to the line item. */
  customAttributes: Array<ShopifyAttribute>;
  /** The discounts that have been allocated onto the order line item by discount applications. */
  discountAllocations: Array<ShopifyDiscountAllocation>;
  /** The total price of the line item, including discounts, and displayed in the presentment currency. */
  discountedTotalPrice: ShopifyMoneyV2;
  /** The total price of the line item, not including any discounts. The total price is calculated using the original unit price multiplied by the quantity, and it is displayed in the presentment currency. */
  originalTotalPrice: ShopifyMoneyV2;
  /** The number of products variants associated to the line item. */
  quantity: Scalars['Int'];
  /** The title of the product combined with title of the variant. */
  title: Scalars['String'];
  /** The product variant object associated to the line item. */
  variant?: Maybe<ShopifyProductVariant>;
};

export type ShopifyOrderLineItemConnection = {
   __typename?: 'OrderLineItemConnection';
  /** A list of edges. */
  edges: Array<ShopifyOrderLineItemEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyOrderLineItemEdge = {
   __typename?: 'OrderLineItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of OrderLineItemEdge. */
  node: ShopifyOrderLineItem;
};

/** The set of valid sort keys for the Order query. */
export enum ShopifyOrderSortKeys {
  /** Sort by the `processed_at` value. */
  ProcessedAt = 'PROCESSED_AT',
  /** Sort by the `total_price` value. */
  TotalPrice = 'TOTAL_PRICE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type ShopifyPage = ShopifyNode & {
   __typename?: 'Page';
  /** The description of the page, complete with HTML formatting. */
  body: Scalars['HTML'];
  /** Summary of the page body. */
  bodySummary: Scalars['String'];
  /** The timestamp of the page creation. */
  createdAt: Scalars['DateTime'];
  /** A human-friendly unique string for the page automatically generated from its title. */
  handle: Scalars['String'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The title of the page. */
  title: Scalars['String'];
  /** The timestamp of the latest page update. */
  updatedAt: Scalars['DateTime'];
  /** The url pointing to the page accessible from the web. */
  url: Scalars['URL'];
};

export type ShopifyPageConnection = {
   __typename?: 'PageConnection';
  /** A list of edges. */
  edges: Array<ShopifyPageEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyPageEdge = {
   __typename?: 'PageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of PageEdge. */
  node: ShopifyPage;
};

/** Information about pagination in a connection. */
export type ShopifyPageInfo = {
   __typename?: 'PageInfo';
  /** Indicates if there are more pages to fetch. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates if there are any pages prior to the current page. */
  hasPreviousPage: Scalars['Boolean'];
};

/** The set of valid sort keys for the Page query. */
export enum ShopifyPageSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/** A payment applied to a checkout. */
export type ShopifyPayment = ShopifyNode & {
   __typename?: 'Payment';
  /**
   * The amount of the payment.
   * @deprecated Use `amountV2` instead
   */
  amount: Scalars['Money'];
  /** The amount of the payment. */
  amountV2: ShopifyMoneyV2;
  /** The billing address for the payment. */
  billingAddress?: Maybe<ShopifyMailingAddress>;
  /** The checkout to which the payment belongs. */
  checkout: ShopifyCheckout;
  /** The credit card used for the payment in the case of direct payments. */
  creditCard?: Maybe<ShopifyCreditCard>;
  /** A message describing a processing error during asynchronous processing. */
  errorMessage?: Maybe<Scalars['String']>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** A client-side generated token to identify a payment and perform idempotent operations. */
  idempotencyKey?: Maybe<Scalars['String']>;
  /** The URL where the customer needs to be redirected so they can complete the 3D Secure payment flow. */
  nextActionUrl?: Maybe<Scalars['URL']>;
  /** Whether or not the payment is still processing asynchronously. */
  ready: Scalars['Boolean'];
  /** A flag to indicate if the payment is to be done in test mode for gateways that support it. */
  test: Scalars['Boolean'];
  /** The actual transaction recorded by Shopify after having processed the payment with the gateway. */
  transaction?: Maybe<ShopifyTransaction>;
};

/** Settings related to payments. */
export type ShopifyPaymentSettings = {
   __typename?: 'PaymentSettings';
  /** List of the card brands which the shop accepts. */
  acceptedCardBrands: Array<ShopifyCardBrand>;
  /** The url pointing to the endpoint to vault credit cards. */
  cardVaultUrl: Scalars['URL'];
  /** The country where the shop is located. */
  countryCode: ShopifyCountryCode;
  /** The three-letter code for the shop's primary currency. */
  currencyCode: ShopifyCurrencyCode;
  /** A list of enabled currencies (ISO 4217 format) that the shop accepts. Merchants can enable currencies from their Shopify Payments settings in the Shopify admin. */
  enabledPresentmentCurrencies: Array<ShopifyCurrencyCode>;
  /** The shop’s Shopify Payments account id. */
  shopifyPaymentsAccountId?: Maybe<Scalars['String']>;
  /** List of the digital wallets which the shop supports. */
  supportedDigitalWallets: Array<ShopifyDigitalWallet>;
};

/** The valid values for the types of payment token. */
export enum ShopifyPaymentTokenType {
  /** Apple Pay token type. */
  ApplePay = 'APPLE_PAY',
  /** Vault payment token type. */
  Vault = 'VAULT',
  /** Shopify Pay token type. */
  ShopifyPay = 'SHOPIFY_PAY',
  /** Google Pay token type. */
  GooglePay = 'GOOGLE_PAY'
}

/** The value of the percentage pricing object. */
export type ShopifyPricingPercentageValue = {
   __typename?: 'PricingPercentageValue';
  /** The percentage value of the object. */
  percentage: Scalars['Float'];
};

/** The price value (fixed or percentage) for a discount application. */
export type ShopifyPricingValue = ShopifyMoneyV2 | ShopifyPricingPercentageValue;

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProduct = ShopifyNode & ShopifyHasMetafields & {
   __typename?: 'Product';
  /** Indicates if at least one product variant is available for sale. */
  availableForSale: Scalars['Boolean'];
  /** List of collections a product belongs to. */
  collections: ShopifyCollectionConnection;
  /** The compare at price of the product across all variants. */
  compareAtPriceRange: ShopifyProductPriceRange;
  /** The date and time when the product was created. */
  createdAt: Scalars['DateTime'];
  /** Stripped description of the product, single line with HTML tags removed. */
  description: Scalars['String'];
  /** The description of the product, complete with HTML formatting. */
  descriptionHtml: Scalars['HTML'];
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: Scalars['String'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** List of images associated with the product. */
  images: ShopifyImageConnection;
  /** The media associated with the product. */
  media: ShopifyMediaConnection;
  /** The metafield associated with the resource. */
  metafield?: Maybe<ShopifyMetafield>;
  /** A paginated list of metafields associated with the resource. */
  metafields: ShopifyMetafieldConnection;
  /**
   * The online store URL for the product.
   * A value of `null` indicates that the product is not published to the Online Store sales channel.
   */
  onlineStoreUrl?: Maybe<Scalars['URL']>;
  /** List of custom product options (maximum of 3 per product). */
  options: Array<ShopifyProductOption>;
  /** List of price ranges in the presentment currencies for this shop. */
  presentmentPriceRanges: ShopifyProductPriceRangeConnection;
  /** The price range. */
  priceRange: ShopifyProductPriceRange;
  /** A categorization that a product can be tagged with, commonly used for filtering and searching. */
  productType: Scalars['String'];
  /** The date and time when the product was published to the channel. */
  publishedAt: Scalars['DateTime'];
  /**
   * A comma separated list of tags that have been added to the product.
   * Additional access scope required for private apps: unauthenticated_read_product_tags.
   */
  tags: Array<Scalars['String']>;
  /** The product’s title. */
  title: Scalars['String'];
  /** The total quantity of inventory in stock for this Product. */
  totalInventory?: Maybe<Scalars['Int']>;
  /** The date and time when the product was last modified. */
  updatedAt: Scalars['DateTime'];
  /**
   * Find a product’s variant based on its selected options.
   * This is useful for converting a user’s selection of product options into a single matching variant.
   * If there is not a variant for the selected options, `null` will be returned.
   */
  variantBySelectedOptions?: Maybe<ShopifyProductVariant>;
  /** List of the product’s variants. */
  variants: ShopifyProductVariantConnection;
  /** The product’s vendor name. */
  vendor: Scalars['String'];
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductDescriptionArgs = {
  truncateAt?: Maybe<Scalars['Int']>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyProductImageSortKeys>;
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  crop?: Maybe<ShopifyCropRegion>;
  scale?: Maybe<Scalars['Int']>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductMediaArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductMetafieldArgs = {
  namespace: Scalars['String'];
  key: Scalars['String'];
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductOptionsArgs = {
  first?: Maybe<Scalars['Int']>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductPresentmentPriceRangesArgs = {
  presentmentCurrencies?: Maybe<Array<ShopifyCurrencyCode>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductVariantBySelectedOptionsArgs = {
  selectedOptions: Array<ShopifySelectedOptionInput>;
};


/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyProductVariantsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyProductVariantSortKeys>;
};

/** The set of valid sort keys for the ProductCollection query. */
export enum ShopifyProductCollectionSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `price` value. */
  Price = 'PRICE',
  /** Sort by the `best-selling` value. */
  BestSelling = 'BEST_SELLING',
  /** Sort by the `created` value. */
  Created = 'CREATED',
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `manual` value. */
  Manual = 'MANUAL',
  /** Sort by the `collection-default` value. */
  CollectionDefault = 'COLLECTION_DEFAULT',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

export type ShopifyProductConnection = {
   __typename?: 'ProductConnection';
  /** A list of edges. */
  edges: Array<ShopifyProductEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyProductEdge = {
   __typename?: 'ProductEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of ProductEdge. */
  node: ShopifyProduct;
};

/** The set of valid sort keys for the ProductImage query. */
export enum ShopifyProductImageSortKeys {
  /** Sort by the `created_at` value. */
  CreatedAt = 'CREATED_AT',
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/**
 * Custom product property names like "Size", "Color", and "Material".
 * Products are based on permutations of these options.
 * A product may have a maximum of 3 options.
 * 255 characters limit each.
 */
export type ShopifyProductOption = ShopifyNode & {
   __typename?: 'ProductOption';
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The product option’s name. */
  name: Scalars['String'];
  /** The corresponding value to the product option name. */
  values: Array<Scalars['String']>;
};

/** The price range of the product. */
export type ShopifyProductPriceRange = {
   __typename?: 'ProductPriceRange';
  /** The highest variant's price. */
  maxVariantPrice: ShopifyMoneyV2;
  /** The lowest variant's price. */
  minVariantPrice: ShopifyMoneyV2;
};

export type ShopifyProductPriceRangeConnection = {
   __typename?: 'ProductPriceRangeConnection';
  /** A list of edges. */
  edges: Array<ShopifyProductPriceRangeEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyProductPriceRangeEdge = {
   __typename?: 'ProductPriceRangeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of ProductPriceRangeEdge. */
  node: ShopifyProductPriceRange;
};

/** The set of valid sort keys for the Product query. */
export enum ShopifyProductSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `product_type` value. */
  ProductType = 'PRODUCT_TYPE',
  /** Sort by the `vendor` value. */
  Vendor = 'VENDOR',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `created_at` value. */
  CreatedAt = 'CREATED_AT',
  /** Sort by the `best_selling` value. */
  BestSelling = 'BEST_SELLING',
  /** Sort by the `price` value. */
  Price = 'PRICE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyProductVariant = ShopifyNode & ShopifyHasMetafields & {
   __typename?: 'ProductVariant';
  /**
   * Indicates if the product variant is in stock.
   * @deprecated Use `availableForSale` instead
   */
  available?: Maybe<Scalars['Boolean']>;
  /** Indicates if the product variant is available for sale. */
  availableForSale: Scalars['Boolean'];
  /**
   * The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPrice` is higher than `price`.
   * @deprecated Use `compareAtPriceV2` instead
   */
  compareAtPrice?: Maybe<Scalars['Money']>;
  /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`. */
  compareAtPriceV2?: Maybe<ShopifyMoneyV2>;
  /** Whether a product is out of stock but still available for purchase (used for backorders). */
  currentlyNotInStock: Scalars['Boolean'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** Image associated with the product variant. This field falls back to the product image if no image is available. */
  image?: Maybe<ShopifyImage>;
  /** The metafield associated with the resource. */
  metafield?: Maybe<ShopifyMetafield>;
  /** A paginated list of metafields associated with the resource. */
  metafields: ShopifyMetafieldConnection;
  /** List of prices and compare-at prices in the presentment currencies for this shop. */
  presentmentPrices: ShopifyProductVariantPricePairConnection;
  /** List of unit prices in the presentment currencies for this shop. */
  presentmentUnitPrices: ShopifyMoneyV2Connection;
  /**
   * The product variant’s price.
   * @deprecated Use `priceV2` instead
   */
  price: Scalars['Money'];
  /** The product variant’s price. */
  priceV2: ShopifyMoneyV2;
  /** The product object that the product variant belongs to. */
  product: ShopifyProduct;
  /** The total sellable quantity of the variant for online sales channels. */
  quantityAvailable?: Maybe<Scalars['Int']>;
  /** Whether a customer needs to provide a shipping address when placing an order for the product variant. */
  requiresShipping: Scalars['Boolean'];
  /** List of product options applied to the variant. */
  selectedOptions: Array<ShopifySelectedOption>;
  /** The SKU (stock keeping unit) associated with the variant. */
  sku?: Maybe<Scalars['String']>;
  /** The product variant’s title. */
  title: Scalars['String'];
  /** The unit price value for the variant based on the variant's measurement. */
  unitPrice?: Maybe<ShopifyMoneyV2>;
  /** The unit price measurement for the variant. */
  unitPriceMeasurement?: Maybe<ShopifyUnitPriceMeasurement>;
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: Maybe<Scalars['Float']>;
  /** Unit of measurement for weight. */
  weightUnit: ShopifyWeightUnit;
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyProductVariantImageArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  crop?: Maybe<ShopifyCropRegion>;
  scale?: Maybe<Scalars['Int']>;
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyProductVariantMetafieldArgs = {
  namespace: Scalars['String'];
  key: Scalars['String'];
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyProductVariantMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyProductVariantPresentmentPricesArgs = {
  presentmentCurrencies?: Maybe<Array<ShopifyCurrencyCode>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyProductVariantPresentmentUnitPricesArgs = {
  presentmentCurrencies?: Maybe<Array<ShopifyCurrencyCode>>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
};

export type ShopifyProductVariantConnection = {
   __typename?: 'ProductVariantConnection';
  /** A list of edges. */
  edges: Array<ShopifyProductVariantEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyProductVariantEdge = {
   __typename?: 'ProductVariantEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of ProductVariantEdge. */
  node: ShopifyProductVariant;
};

/** The compare-at price and price of a variant sharing a currency. */
export type ShopifyProductVariantPricePair = {
   __typename?: 'ProductVariantPricePair';
  /** The compare-at price of the variant with associated currency. */
  compareAtPrice?: Maybe<ShopifyMoneyV2>;
  /** The price of the variant with associated currency. */
  price: ShopifyMoneyV2;
};

export type ShopifyProductVariantPricePairConnection = {
   __typename?: 'ProductVariantPricePairConnection';
  /** A list of edges. */
  edges: Array<ShopifyProductVariantPricePairEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyProductVariantPricePairEdge = {
   __typename?: 'ProductVariantPricePairEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of ProductVariantPricePairEdge. */
  node: ShopifyProductVariantPricePair;
};

/** The set of valid sort keys for the ProductVariant query. */
export enum ShopifyProductVariantSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `sku` value. */
  Sku = 'SKU',
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * During a search (i.e. when the `query` parameter has been specified on the connection) this sorts the
   * results by relevance to the search term(s). When no search query is specified, this sort key is not
   * deterministic and should not be used.
   */
  Relevance = 'RELEVANCE'
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRoot = {
   __typename?: 'QueryRoot';
  /** List of the shop's articles. */
  articles: ShopifyArticleConnection;
  /** Find a blog by its handle. */
  blogByHandle?: Maybe<ShopifyBlog>;
  /** List of the shop's blogs. */
  blogs: ShopifyBlogConnection;
  /** Find a collection by its handle. */
  collectionByHandle?: Maybe<ShopifyCollection>;
  /** List of the shop’s collections. */
  collections: ShopifyCollectionConnection;
  /** Find a customer by its access token. */
  customer?: Maybe<ShopifyCustomer>;
  node?: Maybe<ShopifyNode>;
  nodes: Array<Maybe<ShopifyNode>>;
  /** Find a page by its handle. */
  pageByHandle?: Maybe<ShopifyPage>;
  /** List of the shop's pages. */
  pages: ShopifyPageConnection;
  /** Find a product by its handle. */
  productByHandle?: Maybe<ShopifyProduct>;
  /**
   * Find recommended products related to a given `product_id`.
   * To learn more about how recommendations are generated, see
   * [*Showing product recommendations on product pages*](https://help.shopify.com/themes/development/recommended-products).
   */
  productRecommendations?: Maybe<Array<ShopifyProduct>>;
  /**
   * Tags added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   */
  productTags: ShopifyStringConnection;
  /** List of product types for the shop's products that are published to your app. */
  productTypes: ShopifyStringConnection;
  /** List of the shop’s products. */
  products: ShopifyProductConnection;
  /** The list of public Storefront API versions, including supported, release candidate and unstable versions. */
  publicApiVersions: Array<ShopifyApiVersion>;
  /** The shop associated with the storefront access token. */
  shop: ShopifyShop;
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootArticlesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyArticleSortKeys>;
  query?: Maybe<Scalars['String']>;
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootBlogByHandleArgs = {
  handle: Scalars['String'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootBlogsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyBlogSortKeys>;
  query?: Maybe<Scalars['String']>;
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootCollectionByHandleArgs = {
  handle: Scalars['String'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyCollectionSortKeys>;
  query?: Maybe<Scalars['String']>;
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootCustomerArgs = {
  customerAccessToken: Scalars['String'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootNodeArgs = {
  id: Scalars['ID'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootNodesArgs = {
  ids: Array<Scalars['ID']>;
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootPageByHandleArgs = {
  handle: Scalars['String'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootPagesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyPageSortKeys>;
  query?: Maybe<Scalars['String']>;
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootProductByHandleArgs = {
  handle: Scalars['String'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootProductRecommendationsArgs = {
  productId: Scalars['ID'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootProductTagsArgs = {
  first: Scalars['Int'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootProductTypesArgs = {
  first: Scalars['Int'];
};


/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyQueryRootProductsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyProductSortKeys>;
  query?: Maybe<Scalars['String']>;
};

/** SEO information. */
export type ShopifySeo = {
   __typename?: 'SEO';
  /** The meta description. */
  description?: Maybe<Scalars['String']>;
  /** The SEO title. */
  title?: Maybe<Scalars['String']>;
};

/**
 * Script discount applications capture the intentions of a discount that
 * was created by a Shopify Script.
 */
export type ShopifyScriptDiscountApplication = ShopifyDiscountApplication & {
   __typename?: 'ScriptDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyDiscountApplicationAllocationMethod;
  /**
   * The description of the application as defined by the Script.
   * @deprecated Use `title` instead
   */
  description: Scalars['String'];
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyDiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyDiscountApplicationTargetType;
  /** The title of the application as defined by the Script. */
  title: Scalars['String'];
  /** The value of the discount application. */
  value: ShopifyPricingValue;
};

/**
 * Custom properties that a shop owner can use to define product variants.
 * Multiple options can exist. Options are represented as: option1, option2, option3, etc.
 */
export type ShopifySelectedOption = {
   __typename?: 'SelectedOption';
  /** The product option’s name. */
  name: Scalars['String'];
  /** The product option’s value. */
  value: Scalars['String'];
};

/** Specifies the input fields required for a selected option. */
export type ShopifySelectedOptionInput = {
  /** The product option’s name. */
  name: Scalars['String'];
  /** The product option’s value. */
  value: Scalars['String'];
};

/** A shipping rate to be applied to a checkout. */
export type ShopifyShippingRate = {
   __typename?: 'ShippingRate';
  /** Human-readable unique identifier for this shipping rate. */
  handle: Scalars['String'];
  /**
   * Price of this shipping rate.
   * @deprecated Use `priceV2` instead
   */
  price: Scalars['Money'];
  /** Price of this shipping rate. */
  priceV2: ShopifyMoneyV2;
  /** Title of this shipping rate. */
  title: Scalars['String'];
};

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShop = {
   __typename?: 'Shop';
  /**
   * List of the shop' articles.
   * @deprecated Use `QueryRoot.articles` instead.
   */
  articles: ShopifyArticleConnection;
  /**
   * List of the shop' blogs.
   * @deprecated Use `QueryRoot.blogs` instead.
   */
  blogs: ShopifyBlogConnection;
  /**
   * Find a collection by its handle.
   * @deprecated Use `QueryRoot.collectionByHandle` instead.
   */
  collectionByHandle?: Maybe<ShopifyCollection>;
  /**
   * List of the shop’s collections.
   * @deprecated Use `QueryRoot.collections` instead.
   */
  collections: ShopifyCollectionConnection;
  /**
   * The three-letter code for the currency that the shop accepts.
   * @deprecated Use `paymentSettings` instead
   */
  currencyCode: ShopifyCurrencyCode;
  /** A description of the shop. */
  description?: Maybe<Scalars['String']>;
  /** A string representing the way currency is formatted when the currency isn’t specified. */
  moneyFormat: Scalars['String'];
  /** The shop’s name. */
  name: Scalars['String'];
  /** Settings related to payments. */
  paymentSettings: ShopifyPaymentSettings;
  /** The shop’s primary domain. */
  primaryDomain: ShopifyDomain;
  /** The shop’s privacy policy. */
  privacyPolicy?: Maybe<ShopifyShopPolicy>;
  /**
   * Find a product by its handle.
   * @deprecated Use `QueryRoot.productByHandle` instead.
   */
  productByHandle?: Maybe<ShopifyProduct>;
  /**
   * A comma separated list of tags that have been added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   * @deprecated Use `QueryRoot.productTags` instead.
   */
  productTags: ShopifyStringConnection;
  /**
   * List of the shop’s product types.
   * @deprecated Use `QueryRoot.productTypes` instead.
   */
  productTypes: ShopifyStringConnection;
  /**
   * List of the shop’s products.
   * @deprecated Use `QueryRoot.products` instead.
   */
  products: ShopifyProductConnection;
  /** The shop’s refund policy. */
  refundPolicy?: Maybe<ShopifyShopPolicy>;
  /** Countries that the shop ships to. */
  shipsToCountries: Array<ShopifyCountryCode>;
  /**
   * The shop’s Shopify Payments account id.
   * @deprecated Use `paymentSettings` instead
   */
  shopifyPaymentsAccountId?: Maybe<Scalars['String']>;
  /** The shop’s terms of service. */
  termsOfService?: Maybe<ShopifyShopPolicy>;
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopArticlesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyArticleSortKeys>;
  query?: Maybe<Scalars['String']>;
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopBlogsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyBlogSortKeys>;
  query?: Maybe<Scalars['String']>;
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopCollectionByHandleArgs = {
  handle: Scalars['String'];
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyCollectionSortKeys>;
  query?: Maybe<Scalars['String']>;
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopProductByHandleArgs = {
  handle: Scalars['String'];
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopProductTagsArgs = {
  first: Scalars['Int'];
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopProductTypesArgs = {
  first: Scalars['Int'];
};


/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyShopProductsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<ShopifyProductSortKeys>;
  query?: Maybe<Scalars['String']>;
};

/** Policy that a merchant has configured for their store, such as their refund or privacy policy. */
export type ShopifyShopPolicy = ShopifyNode & {
   __typename?: 'ShopPolicy';
  /** Policy text, maximum size of 64kb. */
  body: Scalars['String'];
  /** Policy’s handle. */
  handle: Scalars['String'];
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** Policy’s title. */
  title: Scalars['String'];
  /** Public URL to the policy. */
  url: Scalars['URL'];
};

export type ShopifyStringConnection = {
   __typename?: 'StringConnection';
  /** A list of edges. */
  edges: Array<ShopifyStringEdge>;
  /** Information to aid in pagination. */
  pageInfo: ShopifyPageInfo;
};

export type ShopifyStringEdge = {
   __typename?: 'StringEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of StringEdge. */
  node: Scalars['String'];
};

/**
 * Specifies the fields required to complete a checkout with
 * a tokenized payment.
 */
export type ShopifyTokenizedPaymentInput = {
  /** The amount of the payment. */
  amount: Scalars['Money'];
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: Scalars['String'];
  /** The billing address for the payment. */
  billingAddress: ShopifyMailingAddressInput;
  /** The type of payment token. */
  type: Scalars['String'];
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: Scalars['String'];
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>;
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<Scalars['String']>;
};

/**
 * Specifies the fields required to complete a checkout with
 * a tokenized payment.
 */
export type ShopifyTokenizedPaymentInputV2 = {
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyMoneyInput;
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: Scalars['String'];
  /** The billing address for the payment. */
  billingAddress: ShopifyMailingAddressInput;
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: Scalars['String'];
  /** Whether to execute the payment in test mode, if possible. Test mode is not supported in production stores. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>;
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<Scalars['String']>;
  /** The type of payment token. */
  type: Scalars['String'];
};

/**
 * Specifies the fields required to complete a checkout with
 * a tokenized payment.
 */
export type ShopifyTokenizedPaymentInputV3 = {
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyMoneyInput;
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: Scalars['String'];
  /** The billing address for the payment. */
  billingAddress: ShopifyMailingAddressInput;
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: Scalars['String'];
  /** Whether to execute the payment in test mode, if possible. Test mode is not supported in production stores. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>;
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<Scalars['String']>;
  /** The type of payment token. */
  type: ShopifyPaymentTokenType;
};

/** An object representing exchange of money for a product or service. */
export type ShopifyTransaction = {
   __typename?: 'Transaction';
  /**
   * The amount of money that the transaction was for.
   * @deprecated Use `amountV2` instead
   */
  amount: Scalars['Money'];
  /** The amount of money that the transaction was for. */
  amountV2: ShopifyMoneyV2;
  /** The kind of the transaction. */
  kind: ShopifyTransactionKind;
  /**
   * The status of the transaction.
   * @deprecated Use `statusV2` instead
   */
  status: ShopifyTransactionStatus;
  /** The status of the transaction. */
  statusV2?: Maybe<ShopifyTransactionStatus>;
  /** Whether the transaction was done in test mode or not. */
  test: Scalars['Boolean'];
};

export enum ShopifyTransactionKind {
  Sale = 'SALE',
  Capture = 'CAPTURE',
  Authorization = 'AUTHORIZATION',
  EmvAuthorization = 'EMV_AUTHORIZATION',
  Change = 'CHANGE'
}

export enum ShopifyTransactionStatus {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
  Error = 'ERROR'
}


/** The measurement used to calculate a unit price for a product variant (e.g. $9.99 / 100ml). */
export type ShopifyUnitPriceMeasurement = {
   __typename?: 'UnitPriceMeasurement';
  /** The type of unit of measurement for the unit price measurement. */
  measuredType?: Maybe<ShopifyUnitPriceMeasurementMeasuredType>;
  /** The quantity unit for the unit price measurement. */
  quantityUnit?: Maybe<ShopifyUnitPriceMeasurementMeasuredUnit>;
  /** The quantity value for the unit price measurement. */
  quantityValue: Scalars['Float'];
  /** The reference unit for the unit price measurement. */
  referenceUnit?: Maybe<ShopifyUnitPriceMeasurementMeasuredUnit>;
  /** The reference value for the unit price measurement. */
  referenceValue: Scalars['Int'];
};

/** The accepted types of unit of measurement. */
export enum ShopifyUnitPriceMeasurementMeasuredType {
  /** Unit of measurements representing volumes. */
  Volume = 'VOLUME',
  /** Unit of measurements representing weights. */
  Weight = 'WEIGHT',
  /** Unit of measurements representing lengths. */
  Length = 'LENGTH',
  /** Unit of measurements representing areas. */
  Area = 'AREA'
}

/** The valid units of measurement for a unit price measurement. */
export enum ShopifyUnitPriceMeasurementMeasuredUnit {
  /** 1000 milliliters equals 1 liter. */
  Ml = 'ML',
  /** 100 centiliters equals 1 liter. */
  Cl = 'CL',
  /** Metric system unit of volume. */
  L = 'L',
  /** 1 cubic meter equals 1000 liters. */
  M3 = 'M3',
  /** 1000 milligrams equals 1 gram. */
  Mg = 'MG',
  /** Metric system unit of weight. */
  G = 'G',
  /** 1 kilogram equals 1000 grams. */
  Kg = 'KG',
  /** 1000 millimeters equals 1 meter. */
  Mm = 'MM',
  /** 100 centimeters equals 1 meter. */
  Cm = 'CM',
  /** Metric system unit of length. */
  M = 'M',
  /** Metric system unit of area. */
  M2 = 'M2'
}

/** Represents an error in the input of a mutation. */
export type ShopifyUserError = ShopifyDisplayableError & {
   __typename?: 'UserError';
  /** Path to the input field which caused the error. */
  field?: Maybe<Array<Scalars['String']>>;
  /** The error message. */
  message: Scalars['String'];
};

/** Represents a Shopify hosted video. */
export type ShopifyVideo = ShopifyNode & ShopifyMedia & {
   __typename?: 'Video';
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>;
  /** Globally unique identifier. */
  id: Scalars['ID'];
  /** The media content type. */
  mediaContentType: ShopifyMediaContentType;
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyImage>;
  /** The sources for a video. */
  sources: Array<ShopifyVideoSource>;
};

/** Represents a source for a Shopify hosted video. */
export type ShopifyVideoSource = {
   __typename?: 'VideoSource';
  /** The format of the video source. */
  format: Scalars['String'];
  /** The height of the video. */
  height: Scalars['Int'];
  /** The video MIME type. */
  mimeType: Scalars['String'];
  /** The URL of the video. */
  url: Scalars['String'];
  /** The width of the video. */
  width: Scalars['Int'];
};

/** Units of measurement for weight. */
export enum ShopifyWeightUnit {
  /** 1 kilogram equals 1000 grams. */
  Kilograms = 'KILOGRAMS',
  /** Metric system unit of mass. */
  Grams = 'GRAMS',
  /** 1 pound equals 16 ounces. */
  Pounds = 'POUNDS',
  /** Imperial system unit of mass. */
  Ounces = 'OUNCES'
}

export type ShopifyCreateCheckoutMutationVariables = {
  input: ShopifyCheckoutCreateInput;
};


export type ShopifyCreateCheckoutMutation = (
  { __typename?: 'Mutation' }
  & { checkoutCreate?: Maybe<(
    { __typename?: 'CheckoutCreatePayload' }
    & { checkout?: Maybe<(
      { __typename?: 'Checkout' }
      & ShopifyCheckoutFieldsFragment
    )>, checkoutUserErrors: Array<(
      { __typename?: 'CheckoutUserError' }
      & Pick<ShopifyCheckoutUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCheckoutCustomerAssociateMutationVariables = {
  checkoutId: Scalars['ID'];
  customerAccessToken: Scalars['String'];
};


export type ShopifyCheckoutCustomerAssociateMutation = (
  { __typename?: 'Mutation' }
  & { checkoutCustomerAssociateV2?: Maybe<(
    { __typename?: 'CheckoutCustomerAssociateV2Payload' }
    & { checkout?: Maybe<(
      { __typename?: 'Checkout' }
      & ShopifyCheckoutFieldsFragment
    )>, checkoutUserErrors: Array<(
      { __typename?: 'CheckoutUserError' }
      & Pick<ShopifyCheckoutUserError, 'code' | 'field' | 'message'>
    )>, customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<ShopifyCustomer, 'id'>
    )> }
  )> }
);

export type ShopifyCheckoutCustomerDisassociateMutationVariables = {
  checkoutId: Scalars['ID'];
};


export type ShopifyCheckoutCustomerDisassociateMutation = (
  { __typename?: 'Mutation' }
  & { checkoutCustomerDisassociateV2?: Maybe<(
    { __typename?: 'CheckoutCustomerDisassociateV2Payload' }
    & { checkout?: Maybe<(
      { __typename?: 'Checkout' }
      & ShopifyCheckoutFieldsFragment
    )>, checkoutUserErrors: Array<(
      { __typename?: 'CheckoutUserError' }
      & Pick<ShopifyCheckoutUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCheckoutCompleteWithTokenizedPaymentMutationVariables = {
  checkoutId: Scalars['ID'];
  payment: ShopifyTokenizedPaymentInputV3;
};


export type ShopifyCheckoutCompleteWithTokenizedPaymentMutation = (
  { __typename?: 'Mutation' }
  & { checkoutCompleteWithTokenizedPaymentV3?: Maybe<(
    { __typename?: 'CheckoutCompleteWithTokenizedPaymentV3Payload' }
    & { checkout?: Maybe<(
      { __typename?: 'Checkout' }
      & ShopifyCheckoutFieldsFragment
    )>, checkoutUserErrors: Array<(
      { __typename?: 'CheckoutUserError' }
      & Pick<ShopifyCheckoutUserError, 'code' | 'field' | 'message'>
    )>, payment?: Maybe<(
      { __typename?: 'Payment' }
      & Pick<ShopifyPayment, 'id'>
    )> }
  )> }
);

export type ShopifyCheckoutLineItemsReplaceMutationVariables = {
  lineItems: Array<ShopifyCheckoutLineItemInput>;
  checkoutId: Scalars['ID'];
};


export type ShopifyCheckoutLineItemsReplaceMutation = (
  { __typename?: 'Mutation' }
  & { checkoutLineItemsReplace?: Maybe<(
    { __typename?: 'CheckoutLineItemsReplacePayload' }
    & { checkout?: Maybe<(
      { __typename?: 'Checkout' }
      & ShopifyCheckoutFieldsFragment
    )>, userErrors: Array<(
      { __typename?: 'CheckoutUserError' }
      & Pick<ShopifyCheckoutUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCheckoutShippingAddressUpdateMutationVariables = {
  shippingAddress: ShopifyMailingAddressInput;
  checkoutId: Scalars['ID'];
};


export type ShopifyCheckoutShippingAddressUpdateMutation = (
  { __typename?: 'Mutation' }
  & { checkoutShippingAddressUpdateV2?: Maybe<(
    { __typename?: 'CheckoutShippingAddressUpdateV2Payload' }
    & { checkout?: Maybe<(
      { __typename?: 'Checkout' }
      & ShopifyCheckoutFieldsFragment
    )>, checkoutUserErrors: Array<(
      { __typename?: 'CheckoutUserError' }
      & Pick<ShopifyCheckoutUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCheckoutShippingLineUpdateMutationVariables = {
  checkoutId: Scalars['ID'];
  shippingRateHandle: Scalars['String'];
};


export type ShopifyCheckoutShippingLineUpdateMutation = (
  { __typename?: 'Mutation' }
  & { checkoutShippingLineUpdate?: Maybe<(
    { __typename?: 'CheckoutShippingLineUpdatePayload' }
    & { checkout?: Maybe<(
      { __typename?: 'Checkout' }
      & ShopifyCheckoutFieldsFragment
    )>, checkoutUserErrors: Array<(
      { __typename?: 'CheckoutUserError' }
      & Pick<ShopifyCheckoutUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCheckoutFieldsFragment = (
  { __typename?: 'Checkout' }
  & Pick<ShopifyCheckout, 'id' | 'ready' | 'requiresShipping' | 'completedAt' | 'createdAt' | 'currencyCode' | 'email' | 'note' | 'orderStatusUrl' | 'taxExempt' | 'taxesIncluded' | 'webUrl'>
  & { lineItems: (
    { __typename?: 'CheckoutLineItemConnection' }
    & { edges: Array<(
      { __typename?: 'CheckoutLineItemEdge' }
      & Pick<ShopifyCheckoutLineItemEdge, 'cursor'>
      & { node: (
        { __typename?: 'CheckoutLineItem' }
        & ShopifyCheckoutLineItemFieldsFragment
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ), availableShippingRates?: Maybe<(
    { __typename?: 'AvailableShippingRates' }
    & ShopifyAvailableShippingRateFieldsFragment
  )>, lineItemsSubtotalPrice: (
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  ), shippingAddress?: Maybe<(
    { __typename?: 'MailingAddress' }
    & ShopifyAddressFieldsFragment
  )>, shippingLine?: Maybe<(
    { __typename?: 'ShippingRate' }
    & ShopifyShippingRateFieldsFragment
  )>, subtotalPriceV2: (
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  ), totalPriceV2: (
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  ), totalTaxV2: (
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  ) }
);

export type ShopifyAvailableShippingRateFieldsFragment = (
  { __typename?: 'AvailableShippingRates' }
  & Pick<ShopifyAvailableShippingRates, 'ready'>
  & { shippingRates?: Maybe<Array<(
    { __typename?: 'ShippingRate' }
    & ShopifyShippingRateFieldsFragment
  )>> }
);

export type ShopifyShippingRateFieldsFragment = (
  { __typename?: 'ShippingRate' }
  & Pick<ShopifyShippingRate, 'handle' | 'title'>
  & { priceV2: (
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  ) }
);

export type ShopifyAddressFieldsFragment = (
  { __typename?: 'MailingAddress' }
  & Pick<ShopifyMailingAddress, 'id' | 'address1' | 'address2' | 'city' | 'company' | 'country' | 'countryCodeV2' | 'firstName' | 'lastName' | 'name' | 'phone' | 'province' | 'provinceCode' | 'zip' | 'latitude' | 'longitude'>
);

export type ShopifyCheckoutLineItemFieldsFragment = (
  { __typename?: 'CheckoutLineItem' }
  & Pick<ShopifyCheckoutLineItem, 'id' | 'quantity' | 'title'>
  & { unitPrice?: Maybe<(
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  )>, variant?: Maybe<(
    { __typename?: 'ProductVariant' }
    & ShopifyProductVariantFieldsFragment
  )>, customAttributes: Array<(
    { __typename?: 'Attribute' }
    & Pick<ShopifyAttribute, 'key' | 'value'>
  )>, discountAllocations: Array<(
    { __typename?: 'DiscountAllocation' }
    & { allocatedAmount: (
      { __typename?: 'MoneyV2' }
      & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
    ) }
  )> }
);

export type ShopifyGetCollectionByHandleQueryVariables = {
  handle: Scalars['String'];
};


export type ShopifyGetCollectionByHandleQuery = (
  { __typename?: 'QueryRoot' }
  & { collectionByHandle?: Maybe<(
    { __typename?: 'Collection' }
    & ShopifyCollectionFieldsFragment
  )> }
);

export type ShopifyGetCollectionsQueryVariables = {
  pageSize?: Maybe<Scalars['Int']>;
};


export type ShopifyGetCollectionsQuery = (
  { __typename?: 'QueryRoot' }
  & { collections: (
    { __typename?: 'CollectionConnection' }
    & { edges: Array<(
      { __typename?: 'CollectionEdge' }
      & Pick<ShopifyCollectionEdge, 'cursor'>
      & { node: (
        { __typename?: 'Collection' }
        & ShopifyCollectionFieldsFragment
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ) }
);

export type ShopifyCollectionFieldsFragment = (
  { __typename?: 'Collection' }
  & Pick<ShopifyCollection, 'id' | 'handle' | 'title' | 'description'>
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & ShopifyImageFieldsFragment
  )> }
);

export type ShopifyGetCustomerQueryVariables = {
  customerAccessToken: Scalars['String'];
};


export type ShopifyGetCustomerQuery = (
  { __typename?: 'QueryRoot' }
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & ShopifyCustomerFieldsFragment
  )> }
);

export type ShopifyLoginMutationVariables = {
  input: ShopifyCustomerAccessTokenCreateInput;
};


export type ShopifyLoginMutation = (
  { __typename?: 'Mutation' }
  & { customerAccessTokenCreate?: Maybe<(
    { __typename?: 'CustomerAccessTokenCreatePayload' }
    & { customerAccessToken?: Maybe<(
      { __typename?: 'CustomerAccessToken' }
      & Pick<ShopifyCustomerAccessToken, 'accessToken' | 'expiresAt'>
    )>, customerUserErrors: Array<(
      { __typename?: 'CustomerUserError' }
      & Pick<ShopifyCustomerUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyLogoutMutationVariables = {
  customerAccessToken: Scalars['String'];
};


export type ShopifyLogoutMutation = (
  { __typename?: 'Mutation' }
  & { customerAccessTokenDelete?: Maybe<(
    { __typename?: 'CustomerAccessTokenDeletePayload' }
    & Pick<ShopifyCustomerAccessTokenDeletePayload, 'deletedAccessToken' | 'deletedCustomerAccessTokenId'>
    & { userErrors: Array<(
      { __typename?: 'UserError' }
      & Pick<ShopifyUserError, 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCreateCustomerMutationVariables = {
  input: ShopifyCustomerCreateInput;
};


export type ShopifyCreateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { customerCreate?: Maybe<(
    { __typename?: 'CustomerCreatePayload' }
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & ShopifyCustomerFieldsFragment
    )>, customerUserErrors: Array<(
      { __typename?: 'CustomerUserError' }
      & Pick<ShopifyCustomerUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCreateCustomerAddressMutationVariables = {
  customerAccessToken: Scalars['String'];
  address: ShopifyMailingAddressInput;
};


export type ShopifyCreateCustomerAddressMutation = (
  { __typename?: 'Mutation' }
  & { customerAddressCreate?: Maybe<(
    { __typename?: 'CustomerAddressCreatePayload' }
    & { customerAddress?: Maybe<(
      { __typename?: 'MailingAddress' }
      & Pick<ShopifyMailingAddress, 'id'>
    )>, customerUserErrors: Array<(
      { __typename?: 'CustomerUserError' }
      & Pick<ShopifyCustomerUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyUpdateCustomerAddressMutationVariables = {
  customerAccessToken: Scalars['String'];
  id: Scalars['ID'];
  address: ShopifyMailingAddressInput;
};


export type ShopifyUpdateCustomerAddressMutation = (
  { __typename?: 'Mutation' }
  & { customerAddressUpdate?: Maybe<(
    { __typename?: 'CustomerAddressUpdatePayload' }
    & { customerAddress?: Maybe<(
      { __typename?: 'MailingAddress' }
      & ShopifyAddressFieldsFragment
    )>, customerUserErrors: Array<(
      { __typename?: 'CustomerUserError' }
      & Pick<ShopifyCustomerUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyUpdateCustomerMutationVariables = {
  customerAccessToken: Scalars['String'];
  customer: ShopifyCustomerUpdateInput;
};


export type ShopifyUpdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { customerUpdate?: Maybe<(
    { __typename?: 'CustomerUpdatePayload' }
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<ShopifyCustomer, 'id'>
    )>, customerAccessToken?: Maybe<(
      { __typename?: 'CustomerAccessToken' }
      & Pick<ShopifyCustomerAccessToken, 'accessToken' | 'expiresAt'>
    )>, customerUserErrors: Array<(
      { __typename?: 'CustomerUserError' }
      & Pick<ShopifyCustomerUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifySetCustomerDefaultAddressMutationVariables = {
  customerAccessToken: Scalars['String'];
  addressId: Scalars['ID'];
};


export type ShopifySetCustomerDefaultAddressMutation = (
  { __typename?: 'Mutation' }
  & { customerDefaultAddressUpdate?: Maybe<(
    { __typename?: 'CustomerDefaultAddressUpdatePayload' }
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<ShopifyCustomer, 'id'>
    )>, customerUserErrors: Array<(
      { __typename?: 'CustomerUserError' }
      & Pick<ShopifyCustomerUserError, 'code' | 'field' | 'message'>
    )> }
  )> }
);

export type ShopifyCustomerFieldsFragment = (
  { __typename?: 'Customer' }
  & Pick<ShopifyCustomer, 'id' | 'displayName' | 'email' | 'firstName' | 'lastName' | 'phone' | 'acceptsMarketing'>
  & { defaultAddress?: Maybe<(
    { __typename?: 'MailingAddress' }
    & ShopifyAddressFieldsFragment
  )>, lastIncompleteCheckout?: Maybe<(
    { __typename?: 'Checkout' }
    & ShopifyCheckoutFieldsFragment
  )> }
);

export type ShopifyGetProductsByCollectionHandleQueryVariables = {
  handle: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
};


export type ShopifyGetProductsByCollectionHandleQuery = (
  { __typename?: 'QueryRoot' }
  & { collectionByHandle?: Maybe<(
    { __typename?: 'Collection' }
    & { products: (
      { __typename?: 'ProductConnection' }
      & { edges: Array<(
        { __typename?: 'ProductEdge' }
        & Pick<ShopifyProductEdge, 'cursor'>
        & { node: (
          { __typename?: 'Product' }
          & ShopifyProductFieldsFragment
        ) }
      )>, pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
      ) }
    ) }
    & ShopifyCollectionFieldsFragment
  )> }
);

export type ShopifyGetProductByHandleQueryVariables = {
  handle: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
};


export type ShopifyGetProductByHandleQuery = (
  { __typename?: 'QueryRoot' }
  & { productByHandle?: Maybe<(
    { __typename?: 'Product' }
    & ShopifyProductWithCollectionsFieldsFragment
  )> }
);

export type ShopifyProductWithCollectionsFieldsFragment = (
  { __typename?: 'Product' }
  & { collections: (
    { __typename?: 'CollectionConnection' }
    & { edges: Array<(
      { __typename?: 'CollectionEdge' }
      & Pick<ShopifyCollectionEdge, 'cursor'>
      & { node: (
        { __typename?: 'Collection' }
        & ShopifyCollectionFieldsFragment
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ) }
  & ShopifyProductFieldsFragment
);

export type ShopifyProductFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<ShopifyProduct, 'id' | 'description' | 'descriptionHtml' | 'handle' | 'productType' | 'title' | 'updatedAt' | 'totalInventory' | 'vendor' | 'tags'>
  & { options: Array<(
    { __typename?: 'ProductOption' }
    & ShopifyProductOptionFieldsFragment
  )>, collections: (
    { __typename?: 'CollectionConnection' }
    & { edges: Array<(
      { __typename?: 'CollectionEdge' }
      & Pick<ShopifyCollectionEdge, 'cursor'>
      & { node: (
        { __typename?: 'Collection' }
        & ShopifyCollectionFieldsFragment
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ), images: (
    { __typename?: 'ImageConnection' }
    & { edges: Array<(
      { __typename?: 'ImageEdge' }
      & Pick<ShopifyImageEdge, 'cursor'>
      & { node: (
        { __typename?: 'Image' }
        & ShopifyImageFieldsFragment
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ), metafields: (
    { __typename?: 'MetafieldConnection' }
    & { edges: Array<(
      { __typename?: 'MetafieldEdge' }
      & Pick<ShopifyMetafieldEdge, 'cursor'>
      & { node: (
        { __typename?: 'Metafield' }
        & ShopifyProducttMetaFieldsFragment
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ), variants: (
    { __typename?: 'ProductVariantConnection' }
    & { edges: Array<(
      { __typename?: 'ProductVariantEdge' }
      & Pick<ShopifyProductVariantEdge, 'cursor'>
      & { node: (
        { __typename?: 'ProductVariant' }
        & ShopifyProductVariantFieldsFragment
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<ShopifyPageInfo, 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ) }
);

export type ShopifyImageFieldsFragment = (
  { __typename?: 'Image' }
  & Pick<ShopifyImage, 'id' | 'altText' | 'originalSrc'>
);

export type ShopifyProductVariantFieldsFragment = (
  { __typename?: 'ProductVariant' }
  & Pick<ShopifyProductVariant, 'id' | 'sku' | 'title' | 'availableForSale' | 'currentlyNotInStock' | 'quantityAvailable' | 'weight' | 'weightUnit'>
  & { product: (
    { __typename?: 'Product' }
    & Pick<ShopifyProduct, 'handle'>
  ), selectedOptions: Array<(
    { __typename?: 'SelectedOption' }
    & ShopifySelectedOptionFieldsFragment
  )>, image?: Maybe<(
    { __typename?: 'Image' }
    & ShopifyImageFieldsFragment
  )>, priceV2: (
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  ), compareAtPriceV2?: Maybe<(
    { __typename?: 'MoneyV2' }
    & Pick<ShopifyMoneyV2, 'amount' | 'currencyCode'>
  )> }
);

export type ShopifyProducttMetaFieldsFragment = (
  { __typename?: 'Metafield' }
  & Pick<ShopifyMetafield, 'id' | 'key' | 'value' | 'description'>
);

export type ShopifyProductOptionFieldsFragment = (
  { __typename?: 'ProductOption' }
  & Pick<ShopifyProductOption, 'id' | 'name' | 'values'>
);

export type ShopifySelectedOptionFieldsFragment = (
  { __typename?: 'SelectedOption' }
  & Pick<ShopifySelectedOption, 'name' | 'value'>
);

export const AddressFieldsFragmentDoc = gql`
    fragment addressFields on MailingAddress {
  id
  address1
  address2
  city
  company
  country
  countryCodeV2
  firstName
  lastName
  name
  phone
  province
  provinceCode
  zip
  latitude
  longitude
}
    `;
export const SelectedOptionFieldsFragmentDoc = gql`
    fragment selectedOptionFields on SelectedOption {
  name
  value
}
    `;
export const ImageFieldsFragmentDoc = gql`
    fragment imageFields on Image {
  id
  altText
  originalSrc
}
    `;
export const ProductVariantFieldsFragmentDoc = gql`
    fragment productVariantFields on ProductVariant {
  id
  sku
  title
  availableForSale
  currentlyNotInStock
  product {
    handle
  }
  quantityAvailable
  selectedOptions {
    ...selectedOptionFields
  }
  image {
    ...imageFields
  }
  priceV2 {
    amount
    currencyCode
  }
  compareAtPriceV2 {
    amount
    currencyCode
  }
  weight
  weightUnit
}
    ${SelectedOptionFieldsFragmentDoc}
${ImageFieldsFragmentDoc}`;
export const CheckoutLineItemFieldsFragmentDoc = gql`
    fragment checkoutLineItemFields on CheckoutLineItem {
  id
  quantity
  title
  unitPrice {
    amount
    currencyCode
  }
  variant {
    ...productVariantFields
  }
  customAttributes {
    key
    value
  }
  discountAllocations {
    allocatedAmount {
      amount
      currencyCode
    }
  }
}
    ${ProductVariantFieldsFragmentDoc}`;
export const ShippingRateFieldsFragmentDoc = gql`
    fragment shippingRateFields on ShippingRate {
  handle
  priceV2 {
    amount
    currencyCode
  }
  title
}
    `;
export const AvailableShippingRateFieldsFragmentDoc = gql`
    fragment availableShippingRateFields on AvailableShippingRates {
  ready
  shippingRates {
    ...shippingRateFields
  }
}
    ${ShippingRateFieldsFragmentDoc}`;
export const CheckoutFieldsFragmentDoc = gql`
    fragment checkoutFields on Checkout {
  id
  ready
  requiresShipping
  lineItems(first: 100) {
    edges {
      cursor
      node {
        ...checkoutLineItemFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
  availableShippingRates {
    ...availableShippingRateFields
  }
  completedAt
  createdAt
  currencyCode
  email
  lineItemsSubtotalPrice {
    amount
    currencyCode
  }
  note
  orderStatusUrl
  shippingAddress {
    ...addressFields
  }
  shippingLine {
    ...shippingRateFields
  }
  subtotalPriceV2 {
    amount
    currencyCode
  }
  taxExempt
  taxesIncluded
  totalPriceV2 {
    amount
    currencyCode
  }
  totalTaxV2 {
    amount
    currencyCode
  }
  webUrl
}
    ${CheckoutLineItemFieldsFragmentDoc}
${AvailableShippingRateFieldsFragmentDoc}
${AddressFieldsFragmentDoc}
${ShippingRateFieldsFragmentDoc}`;
export const CustomerFieldsFragmentDoc = gql`
    fragment customerFields on Customer {
  id
  displayName
  email
  firstName
  lastName
  phone
  acceptsMarketing
  defaultAddress {
    ...addressFields
  }
  phone
  lastIncompleteCheckout {
    ...checkoutFields
  }
}
    ${AddressFieldsFragmentDoc}
${CheckoutFieldsFragmentDoc}`;
export const CollectionFieldsFragmentDoc = gql`
    fragment collectionFields on Collection {
  id
  handle
  title
  image {
    ...imageFields
  }
  description
}
    ${ImageFieldsFragmentDoc}`;
export const ProductOptionFieldsFragmentDoc = gql`
    fragment productOptionFields on ProductOption {
  id
  name
  values
}
    `;
export const ProducttMetaFieldsFragmentDoc = gql`
    fragment producttMetaFields on Metafield {
  id
  key
  value
  description
}
    `;
export const ProductFieldsFragmentDoc = gql`
    fragment productFields on Product {
  id
  description
  descriptionHtml
  handle
  productType
  title
  updatedAt
  totalInventory
  vendor
  tags
  options {
    ...productOptionFields
  }
  collections(first: $pageSize) {
    edges {
      cursor
      node {
        ...collectionFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
  images(first: $pageSize) {
    edges {
      cursor
      node {
        ...imageFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
  metafields(first: $pageSize) {
    edges {
      cursor
      node {
        ...producttMetaFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
  variants(first: $pageSize) {
    edges {
      cursor
      node {
        ...productVariantFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    ${ProductOptionFieldsFragmentDoc}
${CollectionFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${ProducttMetaFieldsFragmentDoc}
${ProductVariantFieldsFragmentDoc}`;
export const ProductWithCollectionsFieldsFragmentDoc = gql`
    fragment productWithCollectionsFields on Product {
  collections(first: $pageSize) {
    edges {
      cursor
      node {
        ...collectionFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
  ...productFields
}
    ${CollectionFieldsFragmentDoc}
${ProductFieldsFragmentDoc}`;
export const CreateCheckoutDocument = gql`
    mutation CreateCheckout($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      ...checkoutFields
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
    ${CheckoutFieldsFragmentDoc}`;

export const CreateCheckoutComponent = (props: Omit<Urql.MutationProps<ShopifyCreateCheckoutMutation, ShopifyCreateCheckoutMutationVariables>, 'query'> & { variables?: ShopifyCreateCheckoutMutationVariables }) => (
  <Urql.Mutation {...props} query={CreateCheckoutDocument} />
);

export const CheckoutCustomerAssociateDocument = gql`
    mutation CheckoutCustomerAssociate($checkoutId: ID!, $customerAccessToken: String!) {
  checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
    checkout {
      ...checkoutFields
    }
    checkoutUserErrors {
      code
      field
      message
    }
    customer {
      id
    }
  }
}
    ${CheckoutFieldsFragmentDoc}`;

export const CheckoutCustomerAssociateComponent = (props: Omit<Urql.MutationProps<ShopifyCheckoutCustomerAssociateMutation, ShopifyCheckoutCustomerAssociateMutationVariables>, 'query'> & { variables?: ShopifyCheckoutCustomerAssociateMutationVariables }) => (
  <Urql.Mutation {...props} query={CheckoutCustomerAssociateDocument} />
);

export const CheckoutCustomerDisassociateDocument = gql`
    mutation CheckoutCustomerDisassociate($checkoutId: ID!) {
  checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
    checkout {
      ...checkoutFields
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
    ${CheckoutFieldsFragmentDoc}`;

export const CheckoutCustomerDisassociateComponent = (props: Omit<Urql.MutationProps<ShopifyCheckoutCustomerDisassociateMutation, ShopifyCheckoutCustomerDisassociateMutationVariables>, 'query'> & { variables?: ShopifyCheckoutCustomerDisassociateMutationVariables }) => (
  <Urql.Mutation {...props} query={CheckoutCustomerDisassociateDocument} />
);

export const CheckoutCompleteWithTokenizedPaymentDocument = gql`
    mutation CheckoutCompleteWithTokenizedPayment($checkoutId: ID!, $payment: TokenizedPaymentInputV3!) {
  checkoutCompleteWithTokenizedPaymentV3(checkoutId: $checkoutId, payment: $payment) {
    checkout {
      ...checkoutFields
    }
    checkoutUserErrors {
      code
      field
      message
    }
    payment {
      id
    }
  }
}
    ${CheckoutFieldsFragmentDoc}`;

export const CheckoutCompleteWithTokenizedPaymentComponent = (props: Omit<Urql.MutationProps<ShopifyCheckoutCompleteWithTokenizedPaymentMutation, ShopifyCheckoutCompleteWithTokenizedPaymentMutationVariables>, 'query'> & { variables?: ShopifyCheckoutCompleteWithTokenizedPaymentMutationVariables }) => (
  <Urql.Mutation {...props} query={CheckoutCompleteWithTokenizedPaymentDocument} />
);

export const CheckoutLineItemsReplaceDocument = gql`
    mutation CheckoutLineItemsReplace($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
  checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
    checkout {
      ...checkoutFields
    }
    userErrors {
      code
      field
      message
    }
  }
}
    ${CheckoutFieldsFragmentDoc}`;

export const CheckoutLineItemsReplaceComponent = (props: Omit<Urql.MutationProps<ShopifyCheckoutLineItemsReplaceMutation, ShopifyCheckoutLineItemsReplaceMutationVariables>, 'query'> & { variables?: ShopifyCheckoutLineItemsReplaceMutationVariables }) => (
  <Urql.Mutation {...props} query={CheckoutLineItemsReplaceDocument} />
);

export const CheckoutShippingAddressUpdateDocument = gql`
    mutation CheckoutShippingAddressUpdate($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
  checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
    checkout {
      ...checkoutFields
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
    ${CheckoutFieldsFragmentDoc}`;

export const CheckoutShippingAddressUpdateComponent = (props: Omit<Urql.MutationProps<ShopifyCheckoutShippingAddressUpdateMutation, ShopifyCheckoutShippingAddressUpdateMutationVariables>, 'query'> & { variables?: ShopifyCheckoutShippingAddressUpdateMutationVariables }) => (
  <Urql.Mutation {...props} query={CheckoutShippingAddressUpdateDocument} />
);

export const CheckoutShippingLineUpdateDocument = gql`
    mutation CheckoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
  checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
    checkout {
      ...checkoutFields
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
    ${CheckoutFieldsFragmentDoc}`;

export const CheckoutShippingLineUpdateComponent = (props: Omit<Urql.MutationProps<ShopifyCheckoutShippingLineUpdateMutation, ShopifyCheckoutShippingLineUpdateMutationVariables>, 'query'> & { variables?: ShopifyCheckoutShippingLineUpdateMutationVariables }) => (
  <Urql.Mutation {...props} query={CheckoutShippingLineUpdateDocument} />
);

export const GetCollectionByHandleDocument = gql`
    query GetCollectionByHandle($handle: String!) {
  collectionByHandle(handle: $handle) {
    ...collectionFields
  }
}
    ${CollectionFieldsFragmentDoc}`;

export const GetCollectionByHandleComponent = (props: Omit<Urql.QueryProps<ShopifyGetCollectionByHandleQuery, ShopifyGetCollectionByHandleQueryVariables>, 'query'> & { variables: ShopifyGetCollectionByHandleQueryVariables }) => (
  <Urql.Query {...props} query={GetCollectionByHandleDocument} />
);

export const GetCollectionsDocument = gql`
    query GetCollections($pageSize: Int) {
  collections(first: $pageSize) {
    edges {
      cursor
      node {
        ...collectionFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    ${CollectionFieldsFragmentDoc}`;

export const GetCollectionsComponent = (props: Omit<Urql.QueryProps<ShopifyGetCollectionsQuery, ShopifyGetCollectionsQueryVariables>, 'query'> & { variables?: ShopifyGetCollectionsQueryVariables }) => (
  <Urql.Query {...props} query={GetCollectionsDocument} />
);

export const GetCustomerDocument = gql`
    query GetCustomer($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    ...customerFields
  }
}
    ${CustomerFieldsFragmentDoc}`;

export const GetCustomerComponent = (props: Omit<Urql.QueryProps<ShopifyGetCustomerQuery, ShopifyGetCustomerQueryVariables>, 'query'> & { variables: ShopifyGetCustomerQueryVariables }) => (
  <Urql.Query {...props} query={GetCustomerDocument} />
);

export const LoginDocument = gql`
    mutation Login($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
    `;

export const LoginComponent = (props: Omit<Urql.MutationProps<ShopifyLoginMutation, ShopifyLoginMutationVariables>, 'query'> & { variables?: ShopifyLoginMutationVariables }) => (
  <Urql.Mutation {...props} query={LoginDocument} />
);

export const LogoutDocument = gql`
    mutation Logout($customerAccessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
    deletedAccessToken
    deletedCustomerAccessTokenId
    userErrors {
      field
      message
    }
  }
}
    `;

export const LogoutComponent = (props: Omit<Urql.MutationProps<ShopifyLogoutMutation, ShopifyLogoutMutationVariables>, 'query'> & { variables?: ShopifyLogoutMutationVariables }) => (
  <Urql.Mutation {...props} query={LogoutDocument} />
);

export const CreateCustomerDocument = gql`
    mutation CreateCustomer($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      ...customerFields
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
    ${CustomerFieldsFragmentDoc}`;

export const CreateCustomerComponent = (props: Omit<Urql.MutationProps<ShopifyCreateCustomerMutation, ShopifyCreateCustomerMutationVariables>, 'query'> & { variables?: ShopifyCreateCustomerMutationVariables }) => (
  <Urql.Mutation {...props} query={CreateCustomerDocument} />
);

export const CreateCustomerAddressDocument = gql`
    mutation CreateCustomerAddress($customerAccessToken: String!, $address: MailingAddressInput!) {
  customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
    customerAddress {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
    `;

export const CreateCustomerAddressComponent = (props: Omit<Urql.MutationProps<ShopifyCreateCustomerAddressMutation, ShopifyCreateCustomerAddressMutationVariables>, 'query'> & { variables?: ShopifyCreateCustomerAddressMutationVariables }) => (
  <Urql.Mutation {...props} query={CreateCustomerAddressDocument} />
);

export const UpdateCustomerAddressDocument = gql`
    mutation UpdateCustomerAddress($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
  customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
    customerAddress {
      ...addressFields
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
    ${AddressFieldsFragmentDoc}`;

export const UpdateCustomerAddressComponent = (props: Omit<Urql.MutationProps<ShopifyUpdateCustomerAddressMutation, ShopifyUpdateCustomerAddressMutationVariables>, 'query'> & { variables?: ShopifyUpdateCustomerAddressMutationVariables }) => (
  <Urql.Mutation {...props} query={UpdateCustomerAddressDocument} />
);

export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
  customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
    customer {
      id
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
    `;

export const UpdateCustomerComponent = (props: Omit<Urql.MutationProps<ShopifyUpdateCustomerMutation, ShopifyUpdateCustomerMutationVariables>, 'query'> & { variables?: ShopifyUpdateCustomerMutationVariables }) => (
  <Urql.Mutation {...props} query={UpdateCustomerDocument} />
);

export const SetCustomerDefaultAddressDocument = gql`
    mutation SetCustomerDefaultAddress($customerAccessToken: String!, $addressId: ID!) {
  customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
    `;

export const SetCustomerDefaultAddressComponent = (props: Omit<Urql.MutationProps<ShopifySetCustomerDefaultAddressMutation, ShopifySetCustomerDefaultAddressMutationVariables>, 'query'> & { variables?: ShopifySetCustomerDefaultAddressMutationVariables }) => (
  <Urql.Mutation {...props} query={SetCustomerDefaultAddressDocument} />
);

export const GetProductsByCollectionHandleDocument = gql`
    query GetProductsByCollectionHandle($handle: String!, $pageSize: Int) {
  collectionByHandle(handle: $handle) {
    ...collectionFields
    products(first: $pageSize) {
      edges {
        cursor
        node {
          ...productFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
    ${CollectionFieldsFragmentDoc}
${ProductFieldsFragmentDoc}`;

export const GetProductsByCollectionHandleComponent = (props: Omit<Urql.QueryProps<ShopifyGetProductsByCollectionHandleQuery, ShopifyGetProductsByCollectionHandleQueryVariables>, 'query'> & { variables: ShopifyGetProductsByCollectionHandleQueryVariables }) => (
  <Urql.Query {...props} query={GetProductsByCollectionHandleDocument} />
);

export const GetProductByHandleDocument = gql`
    query GetProductByHandle($handle: String!, $pageSize: Int) {
  productByHandle(handle: $handle) {
    ...productWithCollectionsFields
  }
}
    ${ProductWithCollectionsFieldsFragmentDoc}`;

export const GetProductByHandleComponent = (props: Omit<Urql.QueryProps<ShopifyGetProductByHandleQuery, ShopifyGetProductByHandleQueryVariables>, 'query'> & { variables: ShopifyGetProductByHandleQueryVariables }) => (
  <Urql.Query {...props} query={GetProductByHandleDocument} />
);
