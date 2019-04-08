/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Context, Contract } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { MyContract } from '.';

import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { stub } from 'sinon';
import * as sinonChai from 'sinon-chai';
import {
    Commodity,
    CommodityClass,
    CommodityIdField,
    Trader,
    TraderClass,
    TraderIdField
} from '../../model/trade-model';

chai.should();
chai.use(sinonChai);

class TestContext implements Context {
    public stub: ChaincodeStub = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: ClientIdentity = sinon.createStubInstance(
        ClientIdentity
    );
}

describe('MyContract', () => {
    describe('#instantiate', () => {
        it('should work', async () => {
            const contract = new MyContract();
            const ctx = new TestContext();
            await contract.instantiate(ctx);
        });
    });

    describe('Trader', () => {
        let contract: MyContract;
        let ctx: Context;
        let trader: Trader;
        const mockedCRUDTrader = stub();

        beforeEach(() => {
            contract = new MyContract();
            ctx = new TestContext();
            trader = {
                $class: TraderClass,
                firstName: 'string',
                lastName: 'string',
                tradeId: 'Identifier'
            };
            contract.CRUDTrader = mockedCRUDTrader;
        });

        afterEach(() => {
            mockedCRUDTrader.reset();
        });

        describe('#addTrader', () => {
            it('should call CRUDTrader with create params', async () => {
                await contract.addTrader(ctx, trader.toString());

                expect(mockedCRUDTrader).to.have.been.calledOnceWithExactly(
                    ctx,
                    trader.toString(),
                    'c'
                );
            });
        });

        describe('#updateTrader', () => {
            it('should call CRUDTrader with update params', async () => {
                await contract.updateTrader(ctx, trader.toString());

                expect(mockedCRUDTrader).to.have.been.calledOnceWithExactly(
                    ctx,
                    trader.toString(),
                    'u'
                );
            });
        });

        describe('#deleteTrader', () => {
            it('should call CRUDTrader with delete params', async () => {
                await contract.deleteTrader(ctx, trader.tradeId);

                expect(mockedCRUDTrader).to.have.been.calledOnceWithExactly(
                    ctx,
                    `{"${TraderIdField}": "${trader.tradeId}"}`,
                    'd'
                );
            });
        });

        describe('#getTrader', () => {
            it('should call CRUDTrader with get params', async () => {
                await contract.getTrader(ctx, trader.tradeId);

                expect(mockedCRUDTrader).to.have.been.calledOnceWithExactly(
                    ctx,
                    `{"${TraderIdField}": "${trader.tradeId}"}`,
                    'r'
                );
            });
        });
    });

    describe('Commodity', () => {
        let contract: MyContract;
        let ctx: Context;
        let commodity: Commodity;
        const mockedCRUDCommodity = stub();

        beforeEach(() => {
            contract = new MyContract();
            ctx = new TestContext();
            commodity = {
                $class: CommodityClass,
                description: 'dfsgdsfgs',
                mainExchange: 'sdgsdfgsfdg',
                owner: 'sdfgdfgsdfgsd',
                quantity: 123,
                tradingSymbol: 'sdfgsdfg'
            };
            contract.CRUDCommodity = mockedCRUDCommodity;
        });

        afterEach(() => {
            mockedCRUDCommodity.reset();
        });

        describe('#addCommodity', () => {
            it('should call CRUDCommodity with create params', async () => {
                await contract.addCommodity(ctx, commodity.toString());

                expect(mockedCRUDCommodity).to.have.been.calledOnceWithExactly(
                    ctx,
                    commodity.toString(),
                    'c'
                );
            });
        });

        describe('#updateCommodity', () => {
            it('should call CRUDCommodity with update params', async () => {
                await contract.updateCommodity(ctx, commodity.toString());

                expect(mockedCRUDCommodity).to.have.been.calledOnceWithExactly(
                    ctx,
                    commodity.toString(),
                    'u'
                );
            });
        });

        describe('#deleteCommodity', () => {
            it('should call CRUDCommodity with delete params', async () => {
                await contract.deleteCommodity(ctx, commodity.tradingSymbol);

                expect(mockedCRUDCommodity).to.have.been.calledOnceWithExactly(
                    ctx,
                    `{"${CommodityIdField}": "${commodity.tradingSymbol}"}`,
                    'd'
                );
            });
        });

        describe('#getCommodity', () => {
            it('should call CRUDCommodity with get params', async () => {
                await contract.getCommodity(ctx, commodity.tradingSymbol);

                expect(mockedCRUDCommodity).to.have.been.calledOnceWithExactly(
                    ctx,
                    `{"${CommodityIdField}": "${commodity.tradingSymbol}"}`,
                    'r'
                );
            });
        });
    });
});
