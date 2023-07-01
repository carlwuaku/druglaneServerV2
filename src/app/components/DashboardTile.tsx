import React, { ReactNode } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const DashboardTile = (props: {
    title: string,
    subtitle: string,
    icon: ReactNode,
    expandContent?: ReactNode,
}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  return (
      <Card className='expandOnHover'>
          
          
          <CardContent>
              
              
              <div className="dashboardContainer">
                  <div className="dashboardIconContainer">
                      <div className="dashboardIcon">{props.icon} </div>
                  </div>
                  <div className="">
                      <p className="dashboardHeader">
                          {props.title}
                      </p>
                      <p className="dashboardDescription">{props.subtitle}</p>
                  </div>
              </div>
              

          </CardContent>
          
              { props.expandContent ? 
              <>
                  <CardActions >
                  <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
              >
                  <ExpandMoreIcon />
              </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
              {props.expandContent}
                  </Collapse>
              </>
              : ''
              }
              
          
          
      </Card>
  )
}

export default DashboardTile