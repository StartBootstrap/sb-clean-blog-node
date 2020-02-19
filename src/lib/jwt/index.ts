import config from '@lib/config';
import { User } from '@lib/orm/entity';
import {
    DecodedToken,
    TokenResponse,
    UserForToken,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export function generateTokenResponse(user: User): TokenResponse {
    const expires = moment()
        .add(config.auth.jwtTokenExpiration, 'minutes')
        .unix();

    return {
        token: jwt.sign(
            {
                ...userForToken(user),
                exp: expires,
            },
            config.auth.jwtSecret
        ),
    };
}

export function validateToken(token: string): DecodedToken {
    return <DecodedToken>jwt.verify(token, config.auth.jwtSecret);
}

export default function userForToken(user: User): UserForToken {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
}
