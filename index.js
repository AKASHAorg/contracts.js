'use strict';

// For geth
if (typeof dapple === 'undefined') {
    var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
    var Web3 = require('web3');
}

dapple['AKASHA'] = (function builder () {
    var environments = {
        'develop': {},
        'live': {},
        'AETH': {}
    };

    function ContractWrapper (headers, _web3) {
        if (!_web3) {
            throw new Error('Must supply a Web3 connection!');
        }

        this.headers = headers;
        this._class = _web3.eth.contract(headers.interface);
    }

    var passthroughs = ['at'];
    for (var i = 0; i < passthroughs.length; i += 1) {
        ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
            return function () {
                return this._class[passthrough].apply(this._class, arguments);
            };
        })(passthroughs[i]);
    }

    function constructor (_web3, env) {
        if (!env) {
            env = {
                'objects': {
                    'registry': {
                        'class': 'RegistryController',
                        'address': '0xc20a377b23e71138fa6c52c5b1e14be5ba79fdba'
                    },
                    'tags': {
                        'class': 'Tags',
                        'address': '0xd1ad662baa60cfc0a566ae50e93b0cd2c61a98a2'
                    },
                    'registry_store': {
                        'class': 'RegistryStore',
                        'address': '0x155c6d4831e0af9e3dee5159fb4e2a79fc0ac2c1'
                    },
                    'feed': {
                        'class': 'Feed',
                        'address': '0xd3a161dbc0acc415b3c73af1ac8ccaa2a2c79f3d'
                    },
                    'faucet': {
                        'class': 'Faucet',
                        'address': '0x73dbff001616c8be349ee2fcbf1eeabe4836a22c'
                    },
                    'funds': {
                        'class': 'Funds',
                        'address': '0xa3e8254a83ac17f5999f0b2a33cf5671d61158f2'
                    },
                    'entries': {
                        'class': 'Entry',
                        'address': '0xbcb5b0974a29d24a3ce0badf18e1350cb8c00361'
                    },
                    'comments': {
                        'class': 'Comments',
                        'address': '0x8361da6abaa79589e768c8014a15dd569a3710e0'
                    },
                    'votes': {
                        'class': 'Votes',
                        'address': '0x23b0c296a9da5c1cbbd27edfe7e1282bb3f511ce'
                    },
                    'subs': {
                        'class': 'Subs',
                        'address': '0x0fd0eed8c14b040f0e8bd18334de1d8153b8a8bd'
                    }
                },
                'type': 'aeth'
            };
        }
        if (!("objects" in env) && typeof env === "object") {
            env = { objects: env };
        }
        while (typeof env !== 'object') {
            if (!(env in environments)) {
                throw new Error('Cannot resolve environment name: ' + env);
            }
            env = environments[env];
        }

        if (typeof _web3 === 'undefined') {
            if (!env.rpcURL) {
                throw new Error('Need either a Web3 instance or an RPC URL!');
            }
            _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
        }

        this.headers = {
            'BaseModule': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'BaseStore': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Comments': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFirstComment',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'setEntryAddress',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getComment',
                        'outputs': [
                            {
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'name': 'id',
                                'type': 'uint256'
                            },
                            {
                                'name': 'parent',
                                'type': 'uint256'
                            },
                            {
                                'name': 'ipfsHash',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'removed',
                                'type': 'bool'
                            },
                            {
                                'name': 'date',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getCommentsCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'parent',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'comment',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'removeComment',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getLastComment',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getPrevComment',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getNextComment',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'indexed': true,
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Commented',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'DLinked': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            },
                            {
                                'name': 'value',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'remove',
                        'outputs': [
                            {
                                'name': 'removed',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            },
                            {
                                'name': 'value',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getNext',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            },
                            {
                                'name': 'value',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getPrev',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            }
                        ],
                        'name': 'getFirst',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            }
                        ],
                        'name': 'getSize',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            },
                            {
                                'name': 'value',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'exists',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            },
                            {
                                'name': 'value',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'insert',
                        'outputs': [
                            {
                                'name': 'inserted',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'self',
                                'type': 'DLinked.List storage'
                            }
                        ],
                        'name': 'getLast',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    }
                ]
            },
            'Entry': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getProfileEntryLast',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getProfileEntriesCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getTagEntryPrev',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getProfileEntryFirst',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getTagEntriesCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getTagEntryNext',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tags',
                                'type': 'address'
                            }
                        ],
                        'name': 'setTagsSource',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'entryExists',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'claimDeposit',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'tags',
                                'type': 'bytes32[]'
                            }
                        ],
                        'name': 'publish',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getTagEntryLast',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'updateEntryContent',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getLastVoteBlock',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'profileId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getProfileEntryNext',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'blockNr',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'setEntryTTL',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getEntryFund',
                        'outputs': [
                            {
                                'name': 'funds',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getEntry',
                        'outputs': [
                            {
                                'name': 'blockNr',
                                'type': 'uint256'
                            },
                            {
                                'name': 'publisher',
                                'type': 'address'
                            },
                            {
                                'name': 'ipfsHash',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'timeStamp',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'profileId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getProfileEntryPrev',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'isEditable',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getTagEntryFirst',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'author',
                                'type': 'address'
                            },
                            {
                                'indexed': true,
                                'name': 'tag',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Publish',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': false,
                                'name': 'author',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Update',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'author',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'indexed': false,
                                'name': 'amount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Claim',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'EntryDeposit': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'receiver',
                                'type': 'address'
                            }
                        ],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'payable': true,
                        'type': 'fallback'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Faucet': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'interval',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'setTimeoutBlock',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAmount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'setAmount',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'claim',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'limit',
                                'type': 'uint8'
                            }
                        ],
                        'name': 'setMaxClaims',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'profile',
                                'type': 'address'
                            }
                        ],
                        'name': 'getLastClaim',
                        'outputs': [
                            {
                                'name': 'blockNr',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'profile',
                                'type': 'address'
                            }
                        ],
                        'name': 'canClaim',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'payable': true,
                        'type': 'fallback'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'amount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Receive',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Feed': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'idIndex',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFollowersById',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getFollowingFirst',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getFollowersFirst',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'next',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFollowersNext',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'prev',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFollowingPrev',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'unFollow',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getFollowersCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'next',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFollowingNext',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getFollowersLast',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'following',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'isFollower',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'repository',
                                'type': 'string'
                            },
                            {
                                'name': 'newVersion',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'releaseNotes',
                                'type': 'string'
                            }
                        ],
                        'name': 'setVersion',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'follow',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getAppState',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bytes32'
                            },
                            {
                                'name': '',
                                'type': 'string'
                            },
                            {
                                'name': '',
                                'type': 'string'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getFollowingLast',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getFollowingCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'follower',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'isFollowing',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'prev',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFollowersPrev',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'idIndex',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFollowingById',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'following',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'follower',
                                'type': 'address'
                            }
                        ],
                        'name': 'Follow',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': false,
                                'name': 'newVersion',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'UpdateVersion',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Funds': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'consumer',
                                'type': 'address'
                            },
                            {
                                'name': 'amount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'withdraw',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'payable': true,
                        'type': 'fallback'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'to',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'amount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Spend',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Profile': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_id',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bytes32'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'sendTip',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': true,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'chunks',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'name': 'setHash',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'name': '_hash',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bytes32'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'inputs': [
                            {
                                'name': 'registrar',
                                'type': 'address'
                            },
                            {
                                'name': 'chunks',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'forwardAddr',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'constructor'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': false,
                                'name': 'from',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'value',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Tip',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'RegistryController': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'store',
                                'type': 'address'
                            }
                        ],
                        'name': 'setStore',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'unregister',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'emitUpdate',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'ipfs',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'name': 'register',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'check_format',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'addressOf',
                        'outputs': [
                            {
                                'name': 'profileAddress',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'key',
                                'type': 'address'
                            }
                        ],
                        'name': 'isRegistered',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newController',
                                'type': 'address'
                            }
                        ],
                        'name': 'migrate',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'key',
                                'type': 'address'
                            }
                        ],
                        'name': 'addressOfKey',
                        'outputs': [
                            {
                                'name': 'profileAddress',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'profile',
                                'type': 'address'
                            }
                        ],
                        'name': 'Register',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'profile',
                                'type': 'address'
                            }
                        ],
                        'name': 'UpdateProfile',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'RegistryStore': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'remove',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'has_store',
                        'outputs': [
                            {
                                'name': 'owned',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'owner',
                                'type': 'address'
                            },
                            {
                                'name': 'profile',
                                'type': 'address'
                            }
                        ],
                        'name': 'add',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'can_store',
                        'outputs': [
                            {
                                'name': 'eligible',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'ethkey',
                                'type': 'address'
                            }
                        ],
                        'name': 'get_by_address',
                        'outputs': [
                            {
                                'name': 'profile',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'get_by_id',
                        'outputs': [
                            {
                                'name': 'profile',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Subs': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'subsLast',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'subscribe',
                        'outputs': [
                            {
                                'name': 'subscribed',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'tag',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'subsPrev',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'isSubscribed',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'unSubscribe',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tags',
                                'type': 'address'
                            }
                        ],
                        'name': 'setTagSource',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'tag',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'subsNext',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'subsCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'subsFirst',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'tag',
                                'type': 'uint256'
                            },
                            {
                                'indexed': true,
                                'name': 'subscriber',
                                'type': 'address'
                            }
                        ],
                        'name': 'Subscribe',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Tags': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'exists',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'add',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getLastTag',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tagId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'remove',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'check_format',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getTagId',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getFirstTag',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getTagCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tagId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getTagName',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bytes32'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tagId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'prevTag',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tagId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'nextTag',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'tag',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'id',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Create',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Remove',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            },
            'Votes': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entries',
                                'type': 'address'
                            }
                        ],
                        'name': 'setEntriesAddress',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getScore',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'int256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newOwner',
                                'type': 'address'
                            }
                        ],
                        'name': 'setOwner',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getVotesCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'voteId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getNextVoteId',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setEnabled',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'weight',
                                'type': 'uint8'
                            }
                        ],
                        'name': 'getVoteCost',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            }
                        ],
                        'name': 'isWhitelisted',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getLastVoteId',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getFirstVoteId',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'isEnabled',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAuthority',
                                'type': 'address'
                            }
                        ],
                        'name': 'setAuthority',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'funds',
                                'type': 'address'
                            }
                        ],
                        'name': 'setFundsAddress',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'who',
                                'type': 'address'
                            },
                            {
                                'name': 'what',
                                'type': 'bool'
                            }
                        ],
                        'name': 'setWhitelisted',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'voteId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getPrevVoteId',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'weight',
                                'type': 'uint8'
                            },
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'upvote',
                        'outputs': [],
                        'payable': true,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newRegistry',
                                'type': 'address'
                            }
                        ],
                        'name': 'setRegistry',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'voteId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getVoteOf',
                        'outputs': [
                            {
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'name': 'score',
                                'type': 'int8'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'weight',
                                'type': 'uint8'
                            },
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'downvote',
                        'outputs': [],
                        'payable': true,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'caller',
                                'type': 'address'
                            },
                            {
                                'name': 'code',
                                'type': 'address'
                            },
                            {
                                'name': 'sig',
                                'type': 'bytes4'
                            }
                        ],
                        'name': 'canCall',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'authority',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'profileAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'getVoteOfProfile',
                        'outputs': [
                            {
                                'name': 'weight',
                                'type': 'int8'
                            }
                        ],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'faucet',
                                'type': 'address'
                            }
                        ],
                        'name': 'setFaucetAddress',
                        'outputs': [],
                        'payable': false,
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'indexed': true,
                                'name': 'entry',
                                'type': 'uint256'
                            },
                            {
                                'indexed': true,
                                'name': 'voteCount',
                                'type': 'uint256'
                            },
                            {
                                'indexed': false,
                                'name': 'weight',
                                'type': 'int8'
                            }
                        ],
                        'name': 'Vote',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSOwnerUpdate',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'authority',
                                'type': 'address'
                            }
                        ],
                        'name': 'DSAuthorityUpdate',
                        'type': 'event'
                    }
                ]
            }
        };

        this.classes = {};
        for (var key in this.headers) {
            this.classes[key] = new ContractWrapper(this.headers[key], _web3);
        }

        this.objects = {};
        for (var i in env.objects) {
            var obj = env.objects[i];
            this.objects[i] = this.classes[obj['class']].at(obj.address);
        }
    }

    return {
        Class: constructor,
        environments: environments
    };
})();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dapple['AKASHA'];
