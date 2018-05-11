import { Component } from 'react'

import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'
import Form from 'grommet/components/Form'
import TextInput from 'grommet/components/TextInput'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'

export default class Team extends Component {
    render () {
    return (
               
        <Section full={true} pad='none' align='center' justify='center' colorIndex='neutral-2'>
            <Box align='center' responsive={true} pad='medium'>
              {FontAwesome({name: 'users', theme: 'dark', size: '4x'})}
              <Heading align='center'>
                <span className='dark'>
                  {t('common:team_title')}
                </span>
              </Heading>
            </Box>
            <Box align='center' responsive={true} direction='row'>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  <span className='dark'>
                    {t('common:team_title_1')}
                  </span>
                </Label>
                <img className="grommetux-image grommetux-image--small img-circle" src={`${imagesUrl}/giedre.jpg`} />
                <Paragraph size='large' margin='small' align='center'>
                  <span className='dark'>
                    {t('common:team_1')}
                  </span>
                </Paragraph>
                <Paragraph size='small' margin='small' align='end'>
                  <a href='https://www.linkedin.com/in/giedre-garbinciute-b008213a/'>
                    {FontAwesome({name: 'linkedin', theme:'dark', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  <span className='dark'>
                    {t('common:team_title_2')}
                  </span>
                </Label>
                <Image size='small' src={`${imagesUrl}/Mantascircle.png`} />
                <Paragraph size='large' margin='small' align='center'>
                  <span className='dark'>
                    {t('common:team_2')}
                  </span>
                </Paragraph>
                <Paragraph size='small' margin='small' align='end'>
                  <a href='https://www.linkedin.com/in/mantas-rukui%C5%BEa-136a84139/'>
                    {FontAwesome({name: 'linkedin', theme:'dark', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  <span className='dark'>
                    {t('common:team_title_3')}
                  </span>
                </Label>
                <img className="grommetux-image grommetux-image--small img-circle" src={`${imagesUrl}/tadas.jpg`} />
                <Paragraph size='large' margin='small' align='center'>
                  <span className='dark'>
                    {t('common:team_3')}
                  </span>
                </Paragraph>
                <Paragraph size='small' margin='small' align='end'>
                  <a href='https://www.linkedin.com/in/xenu255/'>
                    {FontAwesome({name: 'linkedin', theme:'dark', size: '1x'})}
                  </a>
                  &nbsp;
                  <a href='https://talaikis.com'>
                    {FontAwesome({name: 'external-link', theme:'dark', size: '1x'})}
                  </a>
                  &nbsp;
                  <a href='https://medium.com/@dxenu'>
                    {FontAwesome({name: 'medium', theme:'dark', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
            </Box>
        </Section>
    )
  }
}
