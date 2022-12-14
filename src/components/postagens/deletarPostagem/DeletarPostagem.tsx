import React, { useEffect, useState } from 'react'
import { Grid,Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import './DeletarPostagem.css';
import Postagem from '../../../models/Postagem';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function DeletarPostagem() {

    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [post, setPosts] = useState<Postagem>()

    const token : any = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )
    const tipoUser : any = useSelector<TokenState, TokenState["tipoUser"]>(
        (state) => state.tipoUser
    )

    useEffect(() => {
        if(token == '') {
            toast.error('Você precisa estar logado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined
            });
            navigate('/login');
        }
    }, [token])

    useEffect(() => {
        if(id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    function sim() {
        navigate('/postagens')
        deleteId(`/postagens/${id}`, {
            headers: {
            'Authorization': token
            }
        });
        toast.success('Postagem deletada com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined
        });
    }
    
    function nao() {
        navigate('/postagens')
    }

    

    return (
    <>
    {tipoUser === "admin" ? (
        <Box m={2} className='caixa-deletar'>
            <Card className='card-deletar' >
                <CardContent>
                    <Box justifyContent="center">
                    <Typography gutterBottom className="texto">
                        Deseja deletar a Postagem?
                    </Typography>
                    <Typography  className="texto">
                        {post?.titulo}
                    </Typography>
                    </Box>
            </CardContent>
                <CardActions>
                    <Box display="flex" justifyContent="center" ml={1.0} mb={2} >
                    <Box mx={2}>
                    <Button onClick={sim} variant="contained" className="botao-sim" >
                        Sim
                    </Button>
                    </Box>
                    <Box>
                    <Button onClick={nao} variant="contained" className="botao-nao">
                        Não
                    </Button>
                    </Box>
                    </Box>
                </CardActions>
            </Card>
        </Box>
        ) : (
            null
        )}
    </>
    );
}

export default DeletarPostagem;