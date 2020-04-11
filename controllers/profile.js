const ProfileInfo = require('../models').Users;
const ProfileAllergy = require('../models').Allergies;

module.exports = {
    async modifyProfile(req, res) {
        try {
            const {
                user_id,
                user_mail,
                user_password,
                user_prenom,
                user_nom,
                allergies
            } = req.query;
            var old_allergies = [];

            ProfileInfo.update({
                    user_password: user_password,
                    user_prenom: user_prenom,
                    user_nom: user_nom,
                    user_mail: user_mail,
                }, {
                    where: {
                        user_id: user_id,
                    }
                })
                .catch(error => res.status(400).json(error.message))

            ProfileAllergy.findAll({
                    where: {
                        user_id: user_id,
                    }
                })
                .then(allergies => old_allergies = JSON.parse(allergies))
                .catch(error => res.status(400).json(error.message))

            for (k in old_allergies) {
                if (!allergies.contains(k)) {
                    ProfileAllergy.destroy({
                            where: {
                                product_id: k.product_id
                            }
                        })
                        .catch(error => res.status(400).json(error.message))
                }
            }
            for (k in allergies) {
                ProfileAllergy.findOrCreate({
                        where: {
                            user_id: k.user_id,
                            product_id: k.product_id
                        }
                    })
                    .catch(error => res.status(400).json(error.message))
            }

            //comparer liste ancienne à param, delete ceux qui n'y sont pas puis findOrCreate
        } catch (error) {
            res.status(400).json(error.message)
        }
    },
    async getProfile(req, res) {
        const token = req.headers.authorization
        const Bearer = token.split(" ")[1]
        return ProfileInfo.findAll({
                attributes: ['user_id', 'user_mail', 'user_ispremium'],
                where: {
                    user_token: Bearer
                }
            })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(400).json(error.message))
    }
}