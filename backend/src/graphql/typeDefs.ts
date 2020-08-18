import { gql } from 'apollo-server-express';
import fs from 'fs';

export const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.gql'), 'utf-8'));
