<script>
  import Highcharts from 'highcharts'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Dashboard',

    mounted () {
      this.fetchCategories()
    },

    watch: {
      categories () {
        this.setupChart()
      }
    },

    methods: {
      ...mapActions('categories', {
        fetchCategories: 'fetch'
      }),
      setupChart () {
        Highcharts.chart(this.$refs.chartContainer, {
          credits: {
            enabled: false,
            href: 'localhost:8080',
            text: 'localhost'
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: null
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [
            {
              name: 'Produtos',
              colorByPoint: true,
              data: this.dataSource
            }
          ]
        })
      }
    },

    computed: {
      ...mapState('categories', {
        categories (state) {
          return state.list
        }
      }),
      dataSource () {
        return this.categories.map(category => {
          return {
            name: category.name,
            y: category.products.length
          }
        })
      }
    }
  }
</script>

<template>
  <div>
    <h2><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span> Dashboard</h2>
    <!-- bg-primary
    <caixa qtd="{{$totalArtigos}}" titulo="Artigos" url="{{route('artigos.index')}}" cor="orange" icone="ion ion-pie-graph"></caixa>
    -->
    <div class="row">
      <div class="col-md-4">
        <div class="small-box bg-color">
          <div class="inner">
            <h3>{{categories.length}}</h3>

            <p>Categorias</p>
          </div>
          <div class="icon">
            <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
          </div>
          <router-link class="small-box-footer" :to="{ name: 'categories.index' }">
            Ver mais<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </router-link>
        </div>
      </div>
      <div class="col-md-4">
        <div class="small-box bg-color">
          <div class="inner">
            <h3>150</h3>

            <p>Produtos</p>
          </div>
          <div class="icon">
            <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>
          </div>
          <a href="#" class="small-box-footer">
            Ver mais <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </a>
        </div>
      </div>
      <div class="col-md-4">
        <div class="small-box bg-color">
          <div class="inner">
            <h3>5</h3>

            <p>Usuários</p>
          </div>
          <div class="icon">
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          </div>
          <router-link class="small-box-footer" :to="{ name: 'users.index' }">
            Ver mais<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default ">
          <div class="panel-heading">
            <h3 class="panel-title">Quantidade de Produtos por Categorias</h3>
          </div>
          <div class="panel-body">
            <div class="chart-container" ref="chartContainer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .chart-container {
    margin: 0 auto;
    background-color: #f4f4f4;
  }

  .bg-color {
    background-color: #607D8B !important;
  }

  .small-box {
    border-radius: 2px;
    position: relative;
    display: block;
    margin-bottom: 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
    color: #FFF;
  }

  .small-box:hover {
    text-decoration: none;
    color: #f9f9f9;
  }

  .small-box>.inner {
    padding: 10px;
  }

  .small-box h3, .small-box p {
    z-index: 5;
  }

  .small-box h3 {
    font-size: 38px;
    font-weight: bold;
    margin: 0 0 10px 0;
    white-space: nowrap;
    padding: 0;
  }

  .small-box p {
    font-size: 15px;
  }

  p {
    margin: 0 0 10px;
  }

  .small-box .icon {
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 0;
    font-size: 80px;
    color: rgba(0,0,0,0.15);
  }

  .small-box:hover .icon {
    font-size: 85px;
  }

  .small-box>.small-box-footer {
    position: relative;
    text-align: center;
    padding: 3px 0;
    color: #fff;
    color: rgba(255,255,255,0.8);
    display: block;
    z-index: 10;
    background: rgba(0,0,0,0.1);
    text-decoration: none;
  }

  a {
    color: #3c8dbc;
  }

  .small-box>.small-box-footer:hover {
    color: #fff;
    background: rgba(0,0,0,0.15);
  }

  a:hover, a:active, a:focus {
    outline: none;
    text-decoration: none;
    color: #72afd2;
  }
</style>
