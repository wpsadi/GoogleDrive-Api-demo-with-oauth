import { config } from "dotenv";
import db from "../../init.js";
import { ID } from "node-appwrite";
import AppError from "../../../../Utils/ErrorHandler.js";
import { getUserIdentity } from "../../../../Google/getIdentity.js";
import { getUserFromEmail } from "../getUserFromEmail.js";
config();

export const SaveToken = async ({
  access_token,
  refresh_token,
  scope,
  token_type,
  expiry_date,
  id_token,
}) => {
  try {
    if (
      !access_token ||
      !refresh_token ||
      !scope ||
      !token_type ||
      !expiry_date ||
      !id_token
    ) {
      throw new AppError("Missing required fields while saving token");
    }

    const ConvertedExpiry_date = new Date(expiry_date).toISOString();
    const NewScope = scope.split(" ");

    const userInfo = await getUserIdentity({
      access_token,
    });

    const checkExisting = await getUserFromEmail(userInfo.email);

    if (checkExisting.found) {

      // Updating tokens
      await db.updateDocument(
        process.env.dbID,
        process.env.tokenCollectionID,
        checkExisting.user.tokens[`$id`],
        {
            ...{
                access_token,
                refresh_token,
                token_type:token_type
            },
            scope:NewScope,
            expiry_date:ConvertedExpiry_date,
            googleIdentityTokens:checkExisting.user.googleIdentityTokens[`$id`],
            users:checkExisting.user[`$id`]
        }
    )

    // updating the Identity
    await db.updateDocument(
      process.env.dbID,
      process.env.googleIdentityTokenCollectionID,
      checkExisting.user.googleIdentityTokens[`$id`],
      {
          id_token:id_token,
          users:checkExisting.user[`$id`],
          tokens:checkExisting.user.tokens[`$id`]
      }
  )

  return {
    userId: checkExisting.user[`$id`],
    tokenId: checkExisting.user.tokens[`$id`],
    identityId: checkExisting.user.googleIdentityTokens[`$id`],
  };

    } else {
      // unique Ids
      const IDsaveID = ID.unique();
      const IDsaveToken = ID.unique();
      const IDsaveUser = ID.unique();

      // Saving User identity token
      await db.createDocument(
        process.env.dbID,
        process.env.googleIdentityTokenCollectionID,
        IDsaveID,
        {
          id_token,
          users: IDsaveUser,
          tokens: IDsaveToken,
        }
      );

      // Saving the main Token
      await db.createDocument(
        process.env.dbID,
        process.env.tokenCollectionID,
        IDsaveToken,
        {
          access_token,
          refresh_token,
          token_type,
          scope: NewScope,
          expiry_date: ConvertedExpiry_date,
          users: IDsaveUser,
          googleIdentityTokens: IDsaveID,
        }
      );

      // saving the user
      await db.createDocument(
        process.env.dbID,
        process.env.userCollectionID,
        IDsaveUser,
        {
          email: userInfo.email,
          googleIdentityTokens: IDsaveID,
          tokens: IDsaveToken,
        }
      );

      return {
        userId: IDsaveUser,
        tokenId: IDsaveToken,
        identityId: IDsaveID,
      };
    }
  } catch (err) {
    throw new AppError(`Error saving token : ${err.message}`);
  }
};
