import { Component } from 'react'

import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'
import Form from 'grommet/components/Form'
import TextInput from 'grommet/components/TextInput'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'

export default class About extends Component {
    render () {
    return (
        <Section full={true} pad='medium' align='center' justify='center' texture={`url(${imagesUrl}/bcg4.svg)`} colorIndex='neutral-4'>
          <Box align='center' responsive={true} pad='medium'>
            {FontAwesome({name: 'battery-full', theme: 'light', size: '4x'})}
            <Heading align='center'>
              <span className='light'>
                {t('common:about_title')}
              </span>
            </Heading>
            <Box align='center' responsive={true} direction='row'>
              <Box align='center' pad='medium' size='large' responsive={true}>
                <Image size='large' src={`${imagesUrl}/about.png`} />
              </Box>
              <Box align='center' pad='medium' size='large'>
                <Label>
                  <span className='light'>
                    {t('common:about_1')}
                  </span>
                </Label>
                <Label>
                  <span className='light'>
                    {t('common:about_2')}
                  </span>
                </Label>
              </Box>
            </Box>
            <Box align='center' responsive={true}>
              <Label>
                <span className='light'>
                  {t('common:about_3')}
                </span>
              </Label>
            </Box>
          </Box>
        </Section>
    )
  }
}
