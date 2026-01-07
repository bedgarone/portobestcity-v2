//editorial page with all the journalistic principles followed by the project

import React from 'react'
import { MAIN_CONTAINER_CLASSES } from '@/app/utils'

const EditorialPage: React.FC = () => {
  return (
    <main className={`${MAIN_CONTAINER_CLASSES} text-md`}>
      <section className="mb-8 flex flex-col space-y-6">
        <h2 className="text-dark-blue mb-4 font-sans text-2xl font-semibold">Editorial</h2>
        <p>
          PortoBestCity is an independent and informative digital publication from the region of Porto and the North of
          Portugal, whose main objective is to provide readers (locals and tourists) with relevant, updated, truthful,
          rigorous and impartial information about the North region of Portugal, while focusing in the city of Porto.
        </p>
        <p>
          PortoBestCity seeks to ensure the separation between opinions and facts, as well as repudiating any form of
          censorship or discrimination.
        </p>
        <p>PortoBestCity verifies and identifies the sources used in the production of information.</p>
        <p>
          PortoBestCity selects subjects of general interest and specific to the life of the regions in focus to be
          covered in articles, through the production of original multimedia content and/or news, reports and interviews
          duly translated, cited from their sources.
        </p>
        <p>
          PortoBestCity is intended for all those who wish to access credible information, current and in English, on
          general and tourist matters about the city of Porto and the North region of Portugal.
        </p>
        <p>
          PortoBestCity seeks to respond to the information needs of tourists and local readers. To this end, it
          participates in the coverage of some relevant events to the project, complementing the uncovered matters by
          citing credible and registered sources.
        </p>
        <p>
          PortoBestCity follows the guidelines defined, under the terms of the Press Law, by its director and by these
          Editorial Statutes, having as limits the principles enshrined in the Constitution.
        </p>
      </section>
      <section className="mb-8 flex flex-col space-y-6">
        <h2 className="text-dark-blue mb-4 font-sans text-2xl font-semibold">Estatuto Editorial</h2>
        <p>
          PortoBestCity &eacute; uma publica&ccedil;&atilde;o digital independente e informativa da regi&atilde;o do
          Porto e Norte de Portugal, cujo principal objetivo &eacute; providenciar aos leitores (locais e turistas)
          informa&ccedil;&atilde;o relevante, atualizada, verdadeira, rigorosa e isenta sobre a regi&atilde;o Norte de
          Portugal, com foco na cidade do Porto.
        </p>
        <p>
          PortoBestCity procura assegurar a separa&ccedil;&atilde;o entre opini&otilde;es e factos, bem como repudiar
          toda a forma de censura ou discrimina&ccedil;&atilde;o.
        </p>
        <p>
          PortoBestCity verifica as fontes a que recorre na produ&ccedil;&atilde;o das informa&ccedil;&otilde;es,
          identificando-as em todos os casos.
        </p>
        <p>
          PortoBestCity seleciona para as publica&ccedil;&otilde;es assuntos de interesse geral e espec&iacute;fico
          &agrave; vida das regi&otilde;es em foco, atrav&eacute;s da produ&ccedil;&atilde;o de conte&uacute;dos
          multim&eacute;dia originais e/ou not&iacute;cias, reportagens e entrevistas devidamente traduzidas citadas das
          suas fontes.&nbsp;
        </p>
        <p>
          PortoBestCity destina-se a todos aqueles que pretendam aceder a informa&ccedil;&atilde;o cred&iacute;vel,
          atual e em ingl&ecirc;s, sobre assuntos de &iacute;ndole gen&eacute;rica e tur&iacute;stica sobre a cidade do
          Porto e a regi&atilde;o Norte de Portugal.
        </p>
        <p>
          PortoBestCity procura corresponder &agrave;s necessidades de informa&ccedil;&atilde;o dos leitores turistas e
          locais. Para tal, participa na cobertura de alguns eventos relevantes para o projeto, complementando a
          informa&ccedil;&atilde;o n&atilde;o coberta com a cita&ccedil;&atilde;o de fontes cred&iacute;veis e
          registadas.
        </p>
        <p>
          PortoBestCity segue a orienta&ccedil;&atilde;o definida, nos termos da Lei de Imprensa, pelo seu diretor e por
          este Estatuto Editorial, tendo como limites os princ&iacute;pios consagrados na Constitui&ccedil;&atilde;o.
        </p>
      </section>
    </main>
  )
}

export default EditorialPage
