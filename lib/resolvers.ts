import axios from "axios";
import { Resolvers } from "./resolvers-types";

const userProfile = {
  id: String(1),
  name: "John Smith",
  status: "cached",
};

const resolvers: Resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return userProfile;
    },
    async items(_parent, _args, _context, _info) {
      try {
        const { start, limit } = _args;
        const pages = (
          await axios("https://jsonplaceholder.typicode.com/photos")
        )?.data?.length;
        const items = await axios(
          "https://jsonplaceholder.typicode.com/photos",
          {
            params: {
              _start: limit * (start - 1 || 0),
              _limit: limit,
            },
          }
        );
        return {
          items: items?.data,
          pagesCount: Math.ceil(pages / limit),
        };
      } catch (e) {
        console.log(e);
      }

      return {
        items: [],
        pagesCount: 0,
      };
    },
  },
  Mutation: {
    updateName(_parent, _args, _context, _info) {
      userProfile.name = _args.name;
      return userProfile;
    },
  },
};

export default resolvers;
