/*
 * Use this file for functional testing of your smart contract.
 * Fill out the arguments and return values for a function and
 * use the CodeLens links above the transaction blocks to
 * invoke/submit transactions.
 * All transactions defined in your smart contract are used here
 * to generate tests, including those functions that would
 * normally only be used on instantiate and upgrade operations.
 * This basic test file can also be used as the basis for building
 * further functional tests to run as part of a continuous
 * integration pipeline, or for debugging locally deployed smart
 * contracts by invoking/submitting individual transactions.
 */
/*
 * Generating this test file will also trigger an npm install
 * in the smart contract project directory. This installs any
 * package dependencies, including fabric-network, which are
 * required for this test file to be run locally.
 */

import * as assert from 'assert';
import * as fabricNetwork from 'fabric-network';
import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';
import * as os from 'os';
import * as path from 'path';
import { URL } from 'url';

import { Trader, TraderClass } from '../../model/trade-model';

describe('MyContract-trade-network@0.0.1', () => {
    const homedir: string = os.homedir();
    const walletPath: string = path.join(
        homedir,
        '.fabric-vscode',
        'local_fabric',
        'wallet'
    );
    const gateway: fabricNetwork.Gateway = new fabricNetwork.Gateway();
    const fabricWallet: fabricNetwork.FileSystemWallet = new fabricNetwork.FileSystemWallet(
        walletPath
    );
    let identityName: string;
    let connectionProfile: any;

    const trader: Trader = {
        $class: TraderClass,
        firstName: 'aFirstName',
        lastName: 'aLastName',
        tradeId: new Date().toISOString()
    };

    before(async () => {
        const connectionProfilePath: string = path.join(
            homedir,
            '.fabric-vscode',
            'local_fabric',
            'connection.json'
        );
        const connectionProfileContents: any = await fs.readFile(
            connectionProfilePath,
            'utf8'
        );
        if (connectionProfilePath.endsWith('.json')) {
            connectionProfile = JSON.parse(connectionProfileContents);
        } else if (
            connectionProfilePath.endsWith('.yaml') ||
            connectionProfilePath.endsWith('.yml')
        ) {
            connectionProfile = yaml.safeLoad(connectionProfileContents);
        }

        const identities: fabricNetwork.IdentityInfo[] = await fabricWallet.list();
        // TODO: edit to use different identities in wallet
        identityName = identities[0].label;
    });

    beforeEach(async () => {
        const discoveryAsLocalhost: boolean = hasLocalhostURLs(
            connectionProfile
        );
        const discoveryEnabled: boolean = !discoveryAsLocalhost;

        const options: fabricNetwork.GatewayOptions = {
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled
            },
            identity: identityName,
            wallet: fabricWallet
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    it('addTrader', async () => {
        const args: string[] = [JSON.stringify(trader)];
        const response = await submitTransaction('addTrader', args);
        const responseAsString = JSON.stringify(
            JSON.parse(response.toString())
        );

        assert.equal(responseAsString, JSON.stringify(trader));
    }).timeout(10000);

    it('updateTrader', async () => {
        trader.firstName = 'aNewFirsName';

        const args: string[] = [JSON.stringify(trader)];
        const response = await submitTransaction('updateTrader', args);
        const responseAsString = JSON.stringify(
            JSON.parse(response.toString())
        );

        assert.equal(responseAsString, JSON.stringify(trader));
    }).timeout(10000);

    it('existsTrader', async () => {
        const args: string[] = [trader.tradeId];
        const response = await submitTransaction('existsTrader', args);
        const responseAsString = JSON.parse(response.toString());

        assert.equal(responseAsString, true);
    }).timeout(10000);

    it('getTrader', async () => {
        const args: string[] = [trader.tradeId];
        const response = await submitTransaction('getTrader', args);
        const responseAsString = JSON.stringify(
            JSON.parse(response.toString())
        );

        assert.equal(responseAsString, JSON.stringify(trader));
    }).timeout(10000);

    it('deleteTrader', async () => {
        const args: string[] = [trader.tradeId];
        const response = await submitTransaction('deleteTrader', args);

        // Make sure the response is zero length i.e. doesn't have an error
        assert.equal(response.length, 0);
    }).timeout(10000);

    it('getTraderHistory', async () => {
        const args: string[] = [trader.tradeId];
        const response = await submitTransaction('getTraderHistory', args);
        const responseAsArray = JSON.parse(response.toString());

        assert.equal(
            JSON.stringify(responseAsArray[1].data),
            JSON.stringify(trader)
        );
        assert.equal(responseAsArray[2].data, 'DELETED');
    }).timeout(10000);

    xit('addCommodity', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('updateCommodity', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('deleteCommodity', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('getCommodity', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('getCommodityHistory', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('existsCommodity', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('CRUDTrader', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('CRUDCommodity', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('runDynamicQuery', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('runQuery', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('resolveResource', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('tradeCommodity', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    xit('removeHighQuantityCommodities', async () => {
        // TODO: Update with parameters of transaction
        const args: string[] = [];

        // submitTransaction returns buffer of transcation return value
        // TODO: Update with return value of transaction
        assert.equal(true, true);
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    async function submitTransaction(
        functionName: string,
        args: string[]
    ): Promise<Buffer> {
        // Submit transaction

        const network: fabricNetwork.Network = await gateway.getNetwork(
            'mychannel'
        );
        const contract: fabricNetwork.Contract = await network.getContract(
            'trade-network'
        );

        const responseBuffer: Buffer = await contract.submitTransaction(
            functionName,
            ...args
        );
        return responseBuffer;
    }

    // Checks if URL is localhost
    function isLocalhostURL(url: string): boolean {
        const parsedURL: URL = new URL(url);
        const localhosts: string[] = ['localhost', '127.0.0.1'];
        return localhosts.indexOf(parsedURL.hostname) !== -1;
    }

    // Used for determining whether to use discovery
    function hasLocalhostURLs(profile: any): boolean {
        const urls: string[] = [];
        for (const nodeType of [
            'orderers',
            'peers',
            'certificateAuthorities'
        ]) {
            if (!profile[nodeType]) {
                continue;
            }
            const nodes: any = profile[nodeType];
            for (const nodeName in nodes) {
                if (!nodes[nodeName].url) {
                    continue;
                }
                urls.push(nodes[nodeName].url);
            }
        }
        return urls.some((url: string) => isLocalhostURL(url));
    }
});
