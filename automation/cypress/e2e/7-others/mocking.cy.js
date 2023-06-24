describe('Testing the Mock', ()=>{

  it('Testing Mock with simple intercept stubbing', ()=>{
      // https://dummyjson.com/todos/${id}
      cy.visit('https://dummyjson.com')

      cy.intercept({
          path: '/products'
      })
      .as('users')

      cy.get(':nth-child(1) > :nth-child(2) > a').invoke('removeAttr', 'target').click({force: true})
      cy.wait('@users').then(data => {
          cy.log(JSON.stringify(data))

          console.log(JSON.stringify(data.response.body))

          console.log(data.response.body.products)

          expect(data.response.body.products).to.have.length(30)

      })
  })

  it('Intercepting request with static response', ()=>{
      cy.visit('https://dummyjson.com')

      cy.intercept('GET', '/products', {totalposts: 5})
      .as('users')
      cy.get(':nth-child(1) > :nth-child(2) > a').invoke('removeAttr', 'target').click({force: true})
      cy.wait('@users')

  })

  it('Intercepting request with static dynamic fixture', ()=>{
      cy.visit('https://dummyjson.com')

      cy.intercept('GET', '/products', {fixture: 'example.json'})
      .as('users')
      cy.get(':nth-child(1) > :nth-child(2) > a').invoke('removeAttr', 'target').click({force: true})
      cy.wait('@users')

  })

  it('Intercepting request with static dynamic fixture', ()=>{
      cy.visit('https://dummyjson.com')

      cy.intercept('GET', '/products', (req)=> {
          req.reply((res) => {
              res.send({fixture: 'example.json'})
          })
      })
      .as('users')
      cy.get(':nth-child(1) > :nth-child(2) > a').invoke('removeAttr', 'target').click({force: true})
      cy.wait('@users')

  })

})