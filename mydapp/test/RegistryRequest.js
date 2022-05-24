const RegistryRequest = artifacts.require('./RegistryRequest.sol');

contract('RegistryRequest', (accounts) => {

    it('can update the setApplicationBasicInfo', async () => {
        const registryRequest = await RegistryRequest.deployed()
        registryRequest.setApplicationBasicInfo('New Case', 'Layla', 2, '20211111', 'Address 1', 'State',00000000, 2000);

        //const value1 = await registryRequest.getApplicationStatus()
        //assert.equal(value1, 'New Case')
        //const value2 = await registryRequest.getApplicantName()
        //assert.equal(value2, 'Layla')

        const value4 = await registryRequest.getLicenceTerm()
        assert.equal(value4, 2)

        //registryRequest.setApplicationCheckQ(true, true,true,true,true,true,true,true);
        //const value3 = await registryRequest.checkEligibility()
        //assert.equal(value3, true)
    })
})
