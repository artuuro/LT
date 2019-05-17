import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import {
    buttons
} from '../styles';

export default () => {
    const styles = makeStyles(buttons);

    return (
        <Link href="/" className={styles.root}>
            <a>HOME</a>
        </Link>
    );
}