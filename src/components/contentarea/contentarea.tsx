import React, {useEffect, useState, CSSProperties} from 'react';
import VerticalBar from './verticalBar1';
import Util from '../../js/util';
// import {save} from '../../js/storageHandling';
import {Container, Row} from 'react-bootstrap';
import {UserData} from '../../interfaces';
import TagInput from './tagInput';
import Layout from './layout';

import TextAreas from './textAreas1';
import TextAreas2 from './textAreas2';
import TextAreas3 from './textAreas3';
import TextAreas4 from './textAreas4';

export function ContentArea(props:any){
  const [data, setData] = useState<any>(null);
  const [verticalBarExtended, setVerticalBarExtended] = useState<string>('<');
  const [activeNote,setActiveNote] = useState<number>(0);

  const [layout, setLayout] = useState<number>(2);

  useEffect( ()=>{
    let _data:UserData = props.data;
    let active: number = Util.lastElement(_data.list);
    setData(_data);
    setActiveNote( active );
  },[])// eslint-disable-line

  return (
    <Container fluid className="">
        <Layout onClick={ (nr:number): void=>{ setLayout(nr); }}/>
        <Row className="no-gutter">

          <div className="vh-100 overflow-auto mr-3" 
            style={{ width: verticalBarExtended === '<' ? '15%' : '3%'} as CSSProperties}>
            {data && 
            <VerticalBar 
              onClick={(note:number)=> setActiveNote(note)} 
              activeNote={ activeNote }
              />
            }
          </div>
          {layout === 1 && <TextAreas 
              onExtendVerticalbar={(char:string)=>{ setVerticalBarExtended(char); }}
              data={{ activeNote: activeNote, navbarExtended: verticalBarExtended }}/>
          }
          {layout === 2 && <TextAreas2
              onExtendVerticalbar={(char:string)=>{ setVerticalBarExtended(char); }}
              data={{ activeNote: activeNote, navbarExtended: verticalBarExtended }}/>
          }
          {layout === 3 && <TextAreas3
              onExtendVerticalbar={(char:string)=>{ setVerticalBarExtended(char); }}
              data={{ activeNote: activeNote, navbarExtended: verticalBarExtended }}/>
          }
          {layout === 4 && <TextAreas4
              onExtendVerticalbar={(char:string)=>{ setVerticalBarExtended(char); }}
              data={{ activeNote: activeNote, navbarExtended: verticalBarExtended }}/>
          }

        </Row>
        <TagInput  activeNote={ activeNote }/>
    </Container>
  );

}
 
export default ContentArea;