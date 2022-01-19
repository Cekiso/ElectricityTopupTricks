// this is our
module.exports = function(pool) {

    // list all the streets the we have on records
    async function streets() {
        const streets = await pool.query(`select * from street`);
        return streets.rows;
    }

    // for a given street show all the meters and their balances
    async function streetMeters(streetId) {
        var meters = await pool.query(`select meter,balance from electricity_meter where street_id=$1`, [streetId])
        return meters.rows
    }

    // return all the appliances
    async function appliances() {
        var appliance = await pool.query(`select * from appliance`);
        return appliance.rows;
    }

    // increase the meter balance for the meterId supplied
    async function topupElectricity(meterId, units) {
        var meter = await pool.query(`update electricity_meter set balance=$1 where id=$2`, [units, meterId]);
        return meter.row;
    }

    // return the data for a given balance
    async function meterData(meterId) {
        var data = await pool.query(`select meter,balance from electricity_meter where id=$1`, [meterId]);
        return data.rows;
    }

    // decrease the meter balance for the meterId supplied
    // allow a house to use electricity - use `meterId` and `units`
    async function useElectricity(meterId, units) {
        var meterbalance = await pool.query(`update electricity_meter set balance=$1 where id=$2`, [units, meterId]);
        return meterbalance.rows;
    }
    //returns the total balance for each street - this is the totally electricity available to use in the whole street
    async function totalStreetBalance(streetId) {
        var totalbalance = await pool.query(`select sum(balance) as totalbal from electricity_meter where street_id=$1`, [streetId])
        return totalbalance.rows;
    }

    return {
        streets,
        streetMeters,
        appliances,
        topupElectricity,
        meterData,
        useElectricity,
        totalStreetBalance
    }


}