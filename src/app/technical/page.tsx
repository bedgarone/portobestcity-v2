//editorial page with all the journalistic principles followed by the project

import React from 'react'
import { MAIN_CONTAINER_CLASSES } from '@/app/utils'

const EditorialPage: React.FC = () => {
  return (
    <main className={`${MAIN_CONTAINER_CLASSES} text-md`}>
      <h2 className="text-dark-blue mb-4 font-sans text-2xl font-semibold">Technical File</h2>

      <div className="bg-surface-blue my-4 p-4">
        Frequency: Weekly
        <br></br>
        <b>Director</b>: Bruno Oliveira <br />
        <b>Publisher and Editorial Headquarters:</b> Rua do Pinhal, 59 3ESQ 4430-173 V. N. Gaia <br />
        Visit our{' '}
        <a href="/editorial" className="text-blue hover:text-dark-blue font-sans transition-colors">
          Editorial
        </a>
        <br />
        <br />
        <br />
        <b>Invited Writers</b>
        <br />
        Miguel Nunes (Actor, Economist)
        <br />
        Sean Maxwell (Professional Early Musician)
        <br />
        <br />
        <br />
        <b>Owner</b>: Bruno Oliveira <br />
      </div>

      <h2 className="text-dark-blue mt-8 mb-4 font-sans text-2xl font-semibold">Ficha Técnica</h2>

      <div className="bg-surface-blue my-4 p-4">
        Periodicidade: Semanal
        <br></br>
        <b>Diretor</b>: Bruno Oliveira <br />
        <b>Sede do Editor/Redação:</b> Rua do Pinhal, 59 3ESQ 4430-173 V. N. Gaia <br />
        Consulte o nosso{' '}
        <a href="editorial" className="text-blue hover:text-dark-blue font-sans transition-colors">
          Estatuto Editorial
        </a>
        <br />
        <br />
        <br />
        <b>Escritores Convidados</b>
        <br />
        Miguel Nunes (Ator, Economista)
        <br />
        Sean Maxwell (Músico Professional Especialista)
        <br />
        <br />
        <br />
        <b>Proprietário</b>: Bruno Oliveira <br />
      </div>
    </main>
  )
}

export default EditorialPage
