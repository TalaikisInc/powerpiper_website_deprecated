import { Component } from 'react'

import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'
import Form from 'grommet/components/Form'
import TextInput from 'grommet/components/TextInput'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'

import PowerUsage from '../PowerUsage'
import TxCosts from '../TxCosts'

export default class Intro extends Component {
    render () {
    return (
        <Section full={true} pad='none' align='center' justify='center' colorIndex='neutral-2'>
        <Box align='center' responsive={true} pad='large'>
          {FontAwesome({name: 'plug', theme: 'dark', size: '4x'})}
          <Heading align='center'>
            <span className='dark'>
              {t('common:intro_title')}
            </span>
          </Heading>
          <Box align='center' responsive={true} direction='row'>
            <Box pad='medium' size='large'>
              <TxCosts />
            </Box>
            <Box pad='medium' size='large' responsive={true}>
              <Label>
                <span className='dark'>
                  {t('common:intro_1')}
                </span>
              </Label>
              <Label>
                <span className='dark'>
                  {t('common:intro_2')}
                </span>
              </Label>
            </Box>
          </Box>
          <Box align='center' responsive={true} direction='row'>
            <Box pad='medium' size='large' responsive={true}>
              <Label>
                <span className='dark'>
                  {t('common:intro_3')}
                </span>
              </Label>
            </Box>
            <Box pad='medium' size='large' responsive={true}>
            <PowerUsage />
            </Box>
          </Box>
        </Box>
      </Section>
    )
  }
}
