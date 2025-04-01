import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import type { UserProfile, UserUpdates } from "../types";

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Create document client for easier data manipulation
export const docClient = DynamoDBDocumentClient.from(client);

// Table names
export const USERS_TABLE = process.env.DYNAMODB_USERS_TABLE || "Users";

// User operations
export async function getUserById(id: string): Promise<UserProfile | undefined> {
  const command = new GetCommand({
    TableName: USERS_TABLE,
    Key: { id },
  });

  try {
    const response = await docClient.send(command);
    return response.Item as UserProfile | undefined;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<UserProfile | undefined> {
  // In production, you would use a GSI with a QueryCommand
  const command = new QueryCommand({
    TableName: USERS_TABLE,
    IndexName: "EmailIndex", // This would be a GSI in production
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  });

  try {
    const response = await docClient.send(command);
    return response.Items?.[0] as UserProfile | undefined;
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}

export async function createUser(user: UserProfile): Promise<UserProfile> {
  const command = new PutCommand({
    TableName: USERS_TABLE,
    Item: user,
  });

  try {
    await docClient.send(command);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(id: string, updates: UserUpdates): Promise<UserProfile | undefined> {
  // Build update expression
  const updateExpression = `set ${Object.keys(updates).map(key => `#${key} = :${key}`).join(", ")}`;

  // Build expression attribute names
  const expressionAttributeNames: Record<string, string> = {};
  for (const key of Object.keys(updates)) {
    expressionAttributeNames[`#${key}`] = key;
  }

  // Build expression attribute values
  const expressionAttributeValues: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(updates)) {
    expressionAttributeValues[`:${key}`] = value;
  }

  const command = new UpdateCommand({
    TableName: USERS_TABLE,
    Key: { id },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  });

  try {
    const response = await docClient.send(command);
    return response.Attributes as UserProfile | undefined;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  const command = new DeleteCommand({
    TableName: USERS_TABLE,
    Key: { id },
  });

  try {
    await docClient.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
