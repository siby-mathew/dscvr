export type Locker = {
  version: "0.2.2";
  name: "locker";
  instructions: [
    {
      name: "createVestingEscrow";
      accounts: [
        {
          name: "base";
          isMut: true;
          isSigner: true;
        },
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrowToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "sender";
          isMut: true;
          isSigner: true;
        },
        {
          name: "senderToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipient";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
          docs: ["Token program."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "eventAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "program";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "CreateVestingEscrowParameters";
          };
        },
      ];
    },
    {
      name: "claim";
      accounts: [
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrowToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "recipient";
          isMut: true;
          isSigner: true;
        },
        {
          name: "recipientToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
          docs: ["Token program."];
        },
        {
          name: "eventAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "program";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "maxAmount";
          type: "u64";
        },
      ];
    },
    {
      name: "createVestingEscrowMetadata";
      accounts: [
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
          docs: ["The [Escrow]."];
        },
        {
          name: "creator";
          isMut: false;
          isSigner: true;
          docs: ["Creator of the escrow."];
        },
        {
          name: "escrowMetadata";
          isMut: true;
          isSigner: false;
          docs: ["The [ProposalMeta]."];
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
          docs: ["Payer of the [ProposalMeta]."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
          docs: ["System program."];
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "CreateVestingEscrowMetadataParameters";
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: "vestingEscrowMetadata";
      docs: ["Metadata about an escrow."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "escrow";
            docs: ["The [Escrow]."];
            type: "publicKey";
          },
          {
            name: "name";
            docs: ["Name of escrow."];
            type: "string";
          },
          {
            name: "description";
            docs: ["Description of escrow."];
            type: "string";
          },
          {
            name: "creatorEmail";
            docs: ["Email of creator"];
            type: "string";
          },
          {
            name: "recipientEmail";
            docs: ["Email of recipient"];
            type: "string";
          },
        ];
      };
    },
    {
      name: "vestingEscrow";
      type: {
        kind: "struct";
        fields: [
          {
            name: "recipient";
            docs: ["recipient address"];
            type: "publicKey";
          },
          {
            name: "tokenMint";
            docs: ["token mint"];
            type: "publicKey";
          },
          {
            name: "creator";
            docs: ["creator of the escrow"];
            type: "publicKey";
          },
          {
            name: "base";
            docs: ["escrow base key"];
            type: "publicKey";
          },
          {
            name: "escrowBump";
            docs: ["escrow bump"];
            type: "u8";
          },
          {
            name: "updateRecipientMode";
            docs: ["update_recipient_mode"];
            type: "u8";
          },
          {
            name: "padding0";
            docs: ["padding"];
            type: {
              array: ["u8", 6];
            };
          },
          {
            name: "cliffTime";
            docs: ["cliff time"];
            type: "u64";
          },
          {
            name: "frequency";
            docs: ["frequency"];
            type: "u64";
          },
          {
            name: "cliffUnlockAmount";
            docs: ["cliff unlock amount"];
            type: "u64";
          },
          {
            name: "amountPerPeriod";
            docs: ["amount per period"];
            type: "u64";
          },
          {
            name: "numberOfPeriod";
            docs: ["number of period"];
            type: "u64";
          },
          {
            name: "totalClaimedAmount";
            docs: ["total claimed amount"];
            type: "u64";
          },
          {
            name: "vestingStartTime";
            docs: ["vesting start time"];
            type: "u64";
          },
          {
            name: "buffer";
            docs: ["buffer"];
            type: {
              array: ["u128", 6];
            };
          },
        ];
      };
    },
  ];
  types: [
    {
      name: "CreateVestingEscrowMetadataParameters";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "creatorEmail";
            type: "string";
          },
          {
            name: "recipientEmail";
            type: "string";
          },
        ];
      };
    },
    {
      name: "CreateVestingEscrowParameters";
      docs: ["Accounts for [locker::create_vesting_escrow]."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "vestingStartTime";
            type: "u64";
          },
          {
            name: "cliffTime";
            type: "u64";
          },
          {
            name: "frequency";
            type: "u64";
          },
          {
            name: "cliffUnlockAmount";
            type: "u64";
          },
          {
            name: "amountPerPeriod";
            type: "u64";
          },
          {
            name: "numberOfPeriod";
            type: "u64";
          },
          {
            name: "updateRecipientMode";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "UpdateRecipientMode";
      type: {
        kind: "enum";
        variants: [
          {
            name: "NeitherCreatorOrRecipient";
          },
          {
            name: "OnlyCreator";
          },
          {
            name: "OnlyRecipient";
          },
          {
            name: "EitherCreatorAndRecipient";
          },
        ];
      };
    },
  ];
  events: [
    {
      name: "EventCreateVestingEscrow";
      fields: [
        {
          name: "vestingStartTime";
          type: "u64";
          index: false;
        },
        {
          name: "cliffTime";
          type: "u64";
          index: false;
        },
        {
          name: "frequency";
          type: "u64";
          index: false;
        },
        {
          name: "cliffUnlockAmount";
          type: "u64";
          index: false;
        },
        {
          name: "amountPerPeriod";
          type: "u64";
          index: false;
        },
        {
          name: "numberOfPeriod";
          type: "u64";
          index: false;
        },
        {
          name: "updateRecipientMode";
          type: "u8";
          index: false;
        },
        {
          name: "recipient";
          type: "publicKey";
          index: false;
        },
        {
          name: "escrow";
          type: "publicKey";
          index: false;
        },
      ];
    },
    {
      name: "EventClaim";
      fields: [
        {
          name: "amount";
          type: "u64";
          index: false;
        },
        {
          name: "currentTs";
          type: "u64";
          index: false;
        },
        {
          name: "escrow";
          type: "publicKey";
          index: false;
        },
      ];
    },
    {
      name: "EventUpdateVestingEscrowRecipient";
      fields: [
        {
          name: "escrow";
          type: "publicKey";
          index: false;
        },
        {
          name: "oldRecipient";
          type: "publicKey";
          index: false;
        },
        {
          name: "newRecipient";
          type: "publicKey";
          index: false;
        },
        {
          name: "signer";
          type: "publicKey";
          index: false;
        },
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "MathOverflow";
      msg: "Math operation overflow";
    },
    {
      code: 6001;
      name: "FrequencyIsZero";
      msg: "Frequency is zero";
    },
    {
      code: 6002;
      name: "InvalidEscrowTokenAddress";
      msg: "Invalid escrow token address";
    },
    {
      code: 6003;
      name: "InvalidUpdateRecipientMode";
      msg: "Invalid update recipient mode";
    },
    {
      code: 6004;
      name: "NotPermitToDoThisAction";
      msg: "Not permit to do this action";
    },
    {
      code: 6005;
      name: "InvalidRecipientTokenAccount";
      msg: "Invalid recipient token account";
    },
    {
      code: 6006;
      name: "InvalidEscrowMetadata";
      msg: "Invalid escrow metadata";
    },
    {
      code: 6007;
      name: "InvalidVestingStartTime";
      msg: "Invalid vesting start time";
    },
  ];
};

export const IDL: Locker = {
  version: "0.2.2",
  name: "locker",
  instructions: [
    {
      name: "createVestingEscrow",
      accounts: [
        {
          name: "base",
          isMut: true,
          isSigner: true,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sender",
          isMut: true,
          isSigner: true,
        },
        {
          name: "senderToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["Token program."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "eventAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreateVestingEscrowParameters",
          },
        },
      ],
    },
    {
      name: "claim",
      accounts: [
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: true,
          isSigner: true,
        },
        {
          name: "recipientToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["Token program."],
        },
        {
          name: "eventAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "maxAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "createVestingEscrowMetadata",
      accounts: [
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
          docs: ["The [Escrow]."],
        },
        {
          name: "creator",
          isMut: false,
          isSigner: true,
          docs: ["Creator of the escrow."],
        },
        {
          name: "escrowMetadata",
          isMut: true,
          isSigner: false,
          docs: ["The [ProposalMeta]."],
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["Payer of the [ProposalMeta]."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["System program."],
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreateVestingEscrowMetadataParameters",
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "vestingEscrowMetadata",
      docs: ["Metadata about an escrow."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "escrow",
            docs: ["The [Escrow]."],
            type: "publicKey",
          },
          {
            name: "name",
            docs: ["Name of escrow."],
            type: "string",
          },
          {
            name: "description",
            docs: ["Description of escrow."],
            type: "string",
          },
          {
            name: "creatorEmail",
            docs: ["Email of creator"],
            type: "string",
          },
          {
            name: "recipientEmail",
            docs: ["Email of recipient"],
            type: "string",
          },
        ],
      },
    },
    {
      name: "vestingEscrow",
      type: {
        kind: "struct",
        fields: [
          {
            name: "recipient",
            docs: ["recipient address"],
            type: "publicKey",
          },
          {
            name: "tokenMint",
            docs: ["token mint"],
            type: "publicKey",
          },
          {
            name: "creator",
            docs: ["creator of the escrow"],
            type: "publicKey",
          },
          {
            name: "base",
            docs: ["escrow base key"],
            type: "publicKey",
          },
          {
            name: "escrowBump",
            docs: ["escrow bump"],
            type: "u8",
          },
          {
            name: "updateRecipientMode",
            docs: ["update_recipient_mode"],
            type: "u8",
          },
          {
            name: "padding0",
            docs: ["padding"],
            type: {
              array: ["u8", 6],
            },
          },
          {
            name: "cliffTime",
            docs: ["cliff time"],
            type: "u64",
          },
          {
            name: "frequency",
            docs: ["frequency"],
            type: "u64",
          },
          {
            name: "cliffUnlockAmount",
            docs: ["cliff unlock amount"],
            type: "u64",
          },
          {
            name: "amountPerPeriod",
            docs: ["amount per period"],
            type: "u64",
          },
          {
            name: "numberOfPeriod",
            docs: ["number of period"],
            type: "u64",
          },
          {
            name: "totalClaimedAmount",
            docs: ["total claimed amount"],
            type: "u64",
          },
          {
            name: "vestingStartTime",
            docs: ["vesting start time"],
            type: "u64",
          },
          {
            name: "buffer",
            docs: ["buffer"],
            type: {
              array: ["u128", 6],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "CreateVestingEscrowMetadataParameters",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "creatorEmail",
            type: "string",
          },
          {
            name: "recipientEmail",
            type: "string",
          },
        ],
      },
    },
    {
      name: "CreateVestingEscrowParameters",
      docs: ["Accounts for [locker::create_vesting_escrow]."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "vestingStartTime",
            type: "u64",
          },
          {
            name: "cliffTime",
            type: "u64",
          },
          {
            name: "frequency",
            type: "u64",
          },
          {
            name: "cliffUnlockAmount",
            type: "u64",
          },
          {
            name: "amountPerPeriod",
            type: "u64",
          },
          {
            name: "numberOfPeriod",
            type: "u64",
          },
          {
            name: "updateRecipientMode",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "UpdateRecipientMode",
      type: {
        kind: "enum",
        variants: [
          {
            name: "NeitherCreatorOrRecipient",
          },
          {
            name: "OnlyCreator",
          },
          {
            name: "OnlyRecipient",
          },
          {
            name: "EitherCreatorAndRecipient",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "EventCreateVestingEscrow",
      fields: [
        {
          name: "vestingStartTime",
          type: "u64",
          index: false,
        },
        {
          name: "cliffTime",
          type: "u64",
          index: false,
        },
        {
          name: "frequency",
          type: "u64",
          index: false,
        },
        {
          name: "cliffUnlockAmount",
          type: "u64",
          index: false,
        },
        {
          name: "amountPerPeriod",
          type: "u64",
          index: false,
        },
        {
          name: "numberOfPeriod",
          type: "u64",
          index: false,
        },
        {
          name: "updateRecipientMode",
          type: "u8",
          index: false,
        },
        {
          name: "recipient",
          type: "publicKey",
          index: false,
        },
        {
          name: "escrow",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "EventClaim",
      fields: [
        {
          name: "amount",
          type: "u64",
          index: false,
        },
        {
          name: "currentTs",
          type: "u64",
          index: false,
        },
        {
          name: "escrow",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "EventUpdateVestingEscrowRecipient",
      fields: [
        {
          name: "escrow",
          type: "publicKey",
          index: false,
        },
        {
          name: "oldRecipient",
          type: "publicKey",
          index: false,
        },
        {
          name: "newRecipient",
          type: "publicKey",
          index: false,
        },
        {
          name: "signer",
          type: "publicKey",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "MathOverflow",
      msg: "Math operation overflow",
    },
    {
      code: 6001,
      name: "FrequencyIsZero",
      msg: "Frequency is zero",
    },
    {
      code: 6002,
      name: "InvalidEscrowTokenAddress",
      msg: "Invalid escrow token address",
    },
    {
      code: 6003,
      name: "InvalidUpdateRecipientMode",
      msg: "Invalid update recipient mode",
    },
    {
      code: 6004,
      name: "NotPermitToDoThisAction",
      msg: "Not permit to do this action",
    },
    {
      code: 6005,
      name: "InvalidRecipientTokenAccount",
      msg: "Invalid recipient token account",
    },
    {
      code: 6006,
      name: "InvalidEscrowMetadata",
      msg: "Invalid escrow metadata",
    },
    {
      code: 6007,
      name: "InvalidVestingStartTime",
      msg: "Invalid vesting start time",
    },
  ],
};
