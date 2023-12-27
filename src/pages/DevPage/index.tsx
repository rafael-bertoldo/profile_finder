import { useContext, useEffect } from "react"
import { IRepos, UserContext } from "../../providers/UserContext"
import { useNavigate } from "react-router-dom"
import { StyledButtonContainer, StyledFigCaption, StyledFigure, StyledHeader, StyledImg, StyledLink, StyledList, StyledListItem, StyledMain, StyledRepoCreated, StyledRepoDatesContainer, StyledRepoDesc, StyledRepoInfosContainer, StyledRepoLang, StyledRepoLangContainer, StyledRepoLangTitle, StyledRepoLink, StyledRepoTitle, StyledRepoUpdated, StyledReturn, StyledTitle } from "./style"

export default function DevPage() {

  const { user, repos } = useContext(UserContext)
  const navigate = useNavigate()

  if (!user) {
    location.replace('/')
  }

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <>
      <StyledHeader>
        <StyledFigure>
          <StyledImg src={user!.avatar_url} alt="user-image" />
          <StyledFigCaption>{user!.name}</StyledFigCaption>
        </StyledFigure>
        <StyledButtonContainer>
          <StyledLink href={user!.html_url} target="_blank">visitar perfil</StyledLink>
          <StyledReturn onClick={handleNavigate}>nova busca</StyledReturn>
        </StyledButtonContainer>
      </StyledHeader>
      <StyledMain>
        <StyledTitle>repos:</StyledTitle>
        <StyledList>
          {repos.map((repo: IRepos) => (
            <StyledListItem key={repo.repo_name}>
              <StyledRepoInfosContainer>
                <StyledRepoTitle>{repo.repo_name}</StyledRepoTitle>
                {repo.description && <StyledRepoDesc>{repo.description}</StyledRepoDesc>}
              </StyledRepoInfosContainer>
              <StyledRepoDatesContainer>
                <StyledRepoCreated>data de criação: {new Date(repo.created_at).toLocaleDateString()}</StyledRepoCreated>
                <StyledRepoUpdated>última atualização {new Date(repo.updated_at).toLocaleDateString()}</StyledRepoUpdated>
              </StyledRepoDatesContainer>
              <StyledRepoLangContainer>
                <StyledRepoLangTitle>Principal linguagem:</StyledRepoLangTitle>
                <StyledRepoLang>{repo.language}</StyledRepoLang>
              </StyledRepoLangContainer>
              <StyledRepoLink href={repo.repo_html_url} target="_blank">Visitar repositório</StyledRepoLink>

            </StyledListItem>
          ))}
        </StyledList>
      </StyledMain>
    </>
  )
}
