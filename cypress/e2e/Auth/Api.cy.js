/// <reference types="Cypress"/>
describe('Place payzone order', () => {
    const token = '00D0C0000008fkR!AR4AQNLnznW6qYXpOq9X7UmwyngwdRB4Y4HG0tELk1S_KUDarfk351ZS5h1zU6wOvXEJgKxBnxVdXKvhStSiX9mY9AYYwVjV';
    it('api',()=>{
        cy.request({   
            method: 'POST',
            url: "https://bcloud--staging.my.salesforce.com/services/oauth2/token",
            form:true,
            body:{
                "client_id":"3MVG91LYYD8O4krRFZk502yUZjqFaLU52fYEfkOl4kV6SPp8o_fUoA3KtPGaj4tcLL2zVL9y1bfjmTCUtAfnp",
                "client_secret":"25D05A9400290032A21E87846B89186AD59EB95AE61526BD347610A0A40B10CF",
                "grant_type":"password",
                "username":"ayoub.ammor@bcloud.ma.staging",
                "password":"Emsicentre@12345R9sd6DIXuLxmKiInyC8KFJbK"
            }
            }).then((res)=>{
                cy.log(res.body.access_token)
                cy.request({
                    method:'GET',
                    url:"https://bcloud--staging.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Id,Status+From+Order+where+AccountId+in+(SELECT+id+From+Account+where+Name+=+'mehdi+mehdi')+order+by+CreatedDate+desc+LIMIT+1",
                    headers:{
                        'authorization' : 'Bearer '+ res.body.access_token
                    }
                }).then((resOrder)=>{
                    cy.log(res.body.access_token)
                    cy.log(resOrder.body.records[0].Id)
                    cy.request({
                        method:'DELETE',
                        url:"https://bcloud--staging.my.salesforce.com/services/data/v50.0/sobjects/Order/"+resOrder.body.records[0].Id,
                        headers:{
                            'authorization' : 'Bearer '+ res.body.access_token
                        }
                    })
                })
                
            })
    })
})