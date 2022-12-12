const web3 = require('@solana/web3.js')
const secret = require('./guideSecret.json')

const create = async () => {
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed')
  const payer = web3.Keypair.fromSecretKey(new Uint8Array(secret))
  
  const newAccount = web3.Keypair.generate()

  const tx = new web3.Transaction().add(
    web3.SystemProgram.createAccount({
      /** The account that will transfer lamports to the created account */
      fromPubkey: payer.publicKey,
      /** Public key of the created account */
      newAccountPubkey: newAccount.publicKey,
      /** Amount of lamports to transfer to the created account */
      lamports: web3.LAMPORTS_PER_SOL / 100,
      /** Amount of space in bytes to allocate to the created account */
      space: 1000,
      /** Public key of the program to assign as the owner of the created account */
      programId: web3.SystemProgram.programId,
    })
  )

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    tx,
    [payer, newAccount]
  )

  console.log(`Signature: ${signature}`)
}

create()
