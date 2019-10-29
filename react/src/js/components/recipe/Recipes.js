import React from "react";
import { withCookies } from "react-cookie";
import { Container, Row, Col, Spinner, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Import components
import { RecipeCard } from "./RecipeCard";
import CreateRecipeModal from "./CreateRecipeModal";

class recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      recipes: {},
      exampleRecipeCards: [],
      userRecipeCards: [],
      showExampleRecipes: true,
      showUserRecipes: false,
      createRecipeModalIsOpen: false,
    };
    this.updateRecipeCards = this.updateRecipeCards.bind(this);
    this.onClickExampleRecipes = this.onClickExampleRecipes.bind(this);
    this.onClickUserRecipes = this.onClickUserRecipes.bind(this);
    this.toggleCreateRecipeModal = this.toggleCreateRecipeModal.bind(this);
    this.goToRecipe = this.goToRecipe.bind(this);
  }

  componentDidMount() {
    const recipes = this.props.recipes || {};
    if (this.state.loading && recipes.example && recipes.user) {
      this.updateRecipeCards();
      this.setState({ loading: false });
    }
  }

  componentDidUpdate() {
    const recipes = this.props.recipes || {};
    if (this.state.loading && recipes.example && recipes.user) {
      this.updateRecipeCards();
      this.setState({ loading: false });
    }
  }

  onClickExampleRecipes() {
    this.setState({ showExampleRecipes: true, showUserRecipes: false })
  }

  onClickUserRecipes() {
    this.setState({ showExampleRecipes: false, showUserRecipes: true })
  }

  toggleCreateRecipeModal = () => {
    this.setState({ createRecipeModalIsOpen: !this.state.createRecipeModalIsOpen });
  }

  goToRecipe(value, e) {
    return this.props.history.push("/recipe_details/" + (value).toString());
  }

  updateRecipeCards() {
    // Get parameters
    const recipes = this.props.recipes || {};
    const exampleRecipes = recipes.example || {};
    const userRecipes = recipes.user || {};

    // Create example recipe cards
    const exampleRecipeCards = [];
    const exampleRecipeUuids = Object.keys(exampleRecipes);
    if (exampleRecipeUuids.length > 0) {
      exampleRecipeCards.push(exampleRecipeUuids.map((recipeUuid) => {
        const recipe = exampleRecipes[recipeUuid];
        return (
          <Col key={recipeUuid} md="4" sm="6" xs="12" style={{ marginBottom: 15, marginTop: 15 }}>
            <RecipeCard
              recipe={recipe}
              onViewRecipe={this.goToRecipe}
            />
          </Col>
        );
      }
      ));
    }

    // Create user recipe cards
    const userRecipeCards = [];
    const userRecipeUuids = Object.keys(userRecipes);
    if (userRecipeUuids.length > 0) {
      userRecipeCards.push(userRecipeUuids.map((recipeUuid) => {
        const recipe = userRecipes[recipeUuid];
        return (
          <Col key={recipeUuid} md="4" sm="6" xs="12" style={{ marginBottom: 15, marginTop: 15 }}>
            <RecipeCard
              recipe={recipe}
              onViewRecipe={this.goToRecipe}
            />
          </Col>
        );
      }
      ));
    }

    // Update state
    this.setState({ exampleRecipeCards, userRecipeCards });

  }

  render() {
    // Get parameters
    const {
      loading, showExampleRecipes, showUserRecipes, exampleRecipeCards, userRecipeCards,
    } = this.state;

    // Initialize recipe cards
    const recipeCards = showExampleRecipes ? exampleRecipeCards : userRecipeCards;

    // Check if loading
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 200 }}>
          <Spinner color="dark" />
        </div>
      )
    }

    const recipeList = recipeCards.length > 0
      ? <Row style={{ marginLeft: 0, marginRight: 0 }}> {recipeCards} </Row>
      : <div style={{ textAlign: 'center', marginTop: 100 }}> No Recipes </div>;

    // Render component
    return (
      <Container fluid style={{ marginBottom: 30 }}>
        <div style={{ margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <span>
            <Button
              size="sm"
              id="create-recipe-button"
              style={{ marginLeft: 10, borderRadius: 50 }}
              onClick={this.toggleCreateRecipeModal}
            >
              <FontAwesomeIcon icon={faPlus} style={{}} />
              {window.innerWidth > 575 && <span style={{ marginLeft: 10 }}>Create Recipe</span>}
            </Button>
          </span>
        </div>
        <div style={{ margin: 15, marginTop: 0, display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={this.onClickExampleRecipes}
            color={showExampleRecipes ? '' : 'white'}
            style={{
              borderRadius: 20,
              fontWeight: 550,
              backgroundColor: showExampleRecipes ? 'lightgrey' : null,
            }}
          >
            <span style={{ color: showExampleRecipes ? '#343a40' : '#6c757d' }}>
              Example Recipes
            </span>
          </Button>
          <Button
            onClick={this.onClickUserRecipes}
            color={showUserRecipes ? '' : 'white'}
            style={{
              borderRadius: 30,
              fontWeight: 550,
              backgroundColor: showUserRecipes ? 'lightgrey' : null,
            }}
          >
            <span style={{ color: showUserRecipes ? '#343a40' : '#6c757d' }}>
              My Recipes
            </span>
          </Button>
        </div>
        {recipeList}
        <CreateRecipeModal
          user={this.props.user}
          isOpen={this.state.createRecipeModalIsOpen}
          toggle={this.toggleCreateRecipeModal}
          fetchRecipes={this.props.fetchRecipes}
        />
      </Container >

    )
  }
}

export default withCookies(recipes);
