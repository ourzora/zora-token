import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { generateConnectionsConfig } from '@layerzerolabs/metadata-tools'
import { OAppEnforcedOption, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

import { getOftStoreAddress } from './tasks/solana'

// Note:  Do not use address for EVM OmniPointHardhat contracts.  Contracts are loaded using hardhat-deploy.
// If you do use an address, ensure artifacts exists.
const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'ZoraOFTAdapter',
}

const solanaContract: OmniPointHardhat = {
    eid: EndpointId.SOLANA_V2_MAINNET,
    address: getOftStoreAddress(EndpointId.SOLANA_V2_MAINNET),
}

const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 100000,
        value: 0,
    },
]

const SOLANA_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 200000,
        value: 2500000,
    },
]

// Learn about Message Execution Options: https://docs.layerzero.network/v2/developers/solana/oft/account#message-execution-options
// Learn more about the Simple Config Generator - https://docs.layerzero.network/v2/developers/evm/technical-reference/simple-config
export default async function () {
    // note: pathways declared here are automatically bidirectional
    // if you declare A,B there's no need to declare B,A
    const connections = await generateConnectionsConfig([
        [
            baseContract, // Chain A contract
            solanaContract, // Chain B contract
            [['LayerZero Labs', 'Nethermind'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
            [10, 32], // [A to B confirmations, B to A confirmations]
            [SOLANA_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
        ],
    ])

    return {
        contracts: [
            {
                contract: baseContract,
                config: {
                    delegate: '0xe669740B7f2364aaca734fA9C2087121042f327c',
                    owner: '0xe669740B7f2364aaca734fA9C2087121042f327c',
                }
            },
            {
                contract: solanaContract,
                config: {
                    delegate: '2EkhedWDWe3cUNaNtaEJCo7bPYfQDcFVLsR4GXh55c66',
                    owner: '2EkhedWDWe3cUNaNtaEJCo7bPYfQDcFVLsR4GXh55c66'
                }
            },
        ],
        connections,
    }
}
